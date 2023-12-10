import axios from 'axios';
import { endOfMonth, format } from 'date-fns';
import {
  PullRequestEdge,
  GraphQLResponse,
  GithubUser,
  GraphQLContributionCalendarMetricsResponse,
  GraphQLContributionSummaryResponse,
  GraphQLRepositoryContributionData
} from './types';

async function fetchPullRequestsForMonth(
  author: string,
  month: number,
  token: string,
  year_string: string = '2023',
  after?: string
): Promise<PullRequestEdge[]> {
  const startDate = new Date(
    `${year_string}-${month.toString().padStart(2, '0')}-01T00:00:00Z`
  );
  const endDate = endOfMonth(startDate);

  const response = await axios.post<GraphQLResponse>(
    'https://api.github.com/graphql',
    {
      query: `#graphql
        query {
          search(query: "is:pr author:${author} created:${format(
            startDate,
            'yyyy-MM-dd'
          )}..${format(
            endDate,
            'yyyy-MM-dd'
          )}", type: ISSUE, first: 100, after: ${after ? `"${after}"` : null}) {
            edges {
              cursor
              node {
                ... on PullRequest {
                  author {
                    login
                  }
                  number
                  title
                  repository {
                    name
                    owner {
                      login
                    }
                  }
                  createdAt
                  updatedAt
                  mergedAt
                  state
                  additions
                  deletions
                  reviews(last: 100) {
                    edges {
                      node {
                        author {
                          login
                        }
                        createdAt
                        state
                      }
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const pageInfo = response.data.data.search.pageInfo;
  const edges = response.data.data.search.edges;

  if (pageInfo.hasNextPage) {
    const nextPageData = await fetchPullRequestsForMonth(
      author,
      month,
      token,
      year_string,
      pageInfo.endCursor
    );
    return [...edges, ...nextPageData];
  } else {
    return edges;
  }
}

export async function fetchAllPullRequests(author: string, token: string) {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  try {
    const results = await Promise.all(
      months.map((month) => fetchPullRequestsForMonth(author, month, token))
    );
    return results;
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
  }
}

export async function fetchUser(token: string) {
  try {
    const response = await axios.get<GithubUser>(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const userData: GithubUser = response.data;
    return userData;
  } catch (error: any) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
}

async function fetchReviewedPRsForMonth(
  author: string,
  month: number,
  token: string,
  year_string: string = '2023',
  after?: string
): Promise<PullRequestEdge[]> {
  const startDate = new Date(
    `${year_string}-${month.toString().padStart(2, '0')}-01T00:00:00Z`
  );
  const endDate = endOfMonth(startDate);

  const response = await axios.post<GraphQLResponse>(
    'https://api.github.com/graphql',
    {
      query: `#graphql
        query {
          search(query: "is:pr reviewed-by:${author} created:${format(
            startDate,
            'yyyy-MM-dd'
          )}..${format(
            endDate,
            'yyyy-MM-dd'
          )}", type: ISSUE, first: 100, after: ${after ? `"${after}"` : null}) {
            edges {
              cursor
              node {
                ... on PullRequest {
                  author {
                    login
                  }
                  number
                  title
                  repository {
                    name
                    owner {
                      login
                    }
                  }
                  createdAt
                  updatedAt
                  mergedAt
                  state
                  additions
                  deletions
                  reviews(last: 100) {
                    edges {
                      node {
                        author {
                          login
                        }
                        createdAt
                        state
                      }
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const pageInfo = response.data.data.search.pageInfo;
  const edges = response.data.data.search.edges;

  if (pageInfo.hasNextPage) {
    const nextPageData = await fetchReviewedPRsForMonth(
      author,
      month,
      token,
      year_string,
      pageInfo.endCursor
    );
    return [...edges, ...nextPageData];
  } else {
    return edges;
  }
}

export async function fetchAllReviewedPRs(author: string, token: string) {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  try {
    const results = await Promise.all(
      months.map((month) => fetchReviewedPRsForMonth(author, month, token))
    );
    return results;
  } catch (error: any) {
    console.error('Error fetching reviews:', error.message);
  }
}

export async function fetchUserGitHubContributionCalendarMetrics(
  author: string,
  token: string,
  year_string: string = '2023'
) {
  try {
    const response =
      await axios.post<GraphQLContributionCalendarMetricsResponse>(
        'https://api.github.com/graphql',
        {
          query: `
          query GetUserContributions($username: String!) {
            user(login: $username) {
              contributionsCollection(from: "${year_string}-01-01T00:00:00Z", to: "${year_string}-12-31T23:59:59Z") {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `,
          variables: {
            username: author
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    return response.data.data.user.contributionsCollection.contributionCalendar;
  } catch (error: any) {
    console.error('Error fetching GitHub metrics:', error.message);
  }
}

export async function fetchUserContributionSummaryMetrics(
  author: string,
  token: string,
  year_string: string = '2023'
) {
  try {
    const response = await axios.post<GraphQLContributionSummaryResponse>(
      'https://api.github.com/graphql',
      {
        query: `
          query{
            user(login: "${author}") {
              contributionsCollection(from: "${year_string}-01-01T00:00:00Z", to: "${year_string}-12-31T23:59:59Z") {
                totalCommitContributions
                totalIssueContributions
                totalPullRequestContributions
                totalPullRequestReviewContributions
                totalRepositoriesWithContributedPullRequests
                totalRepositoriesWithContributedIssues
                totalRepositoriesWithContributedPullRequestReviews
                totalRepositoriesWithContributedCommits
              }
            }
          }
        `
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data.data.user.contributionsCollection;
  } catch (error: any) {
    console.error('Error fetching GitHub metrics:', error.message);
  }
}

export async function fetchRepoWiseContributionsForUser(
  author: string,
  token: string,
  year_string: string = '2023'
): Promise<GraphQLRepositoryContributionData> {
  const response = await axios.post<GraphQLRepositoryContributionData>(
    'https://api.github.com/graphql',
    {
      query: `
          query {
            user(login: "${author}") {
              contributionsCollection(from: "${year_string}-01-01T00:00:00Z", to: "${year_string}-12-31T23:59:59Z"){
                issueContributionsByRepository(maxRepositories: 100) {
                  repository {
                    name
                    owner {
                      login
                      avatarUrl
                    }
                    isPrivate
                    isFork
                  }
                  contributions {
                    totalCount
                  }
                }
                commitContributionsByRepository(maxRepositories: 100) {
                  repository {
                    name
                    owner {
                      login
                      avatarUrl
                    }
                    isPrivate
                    isFork
                  }
                  contributions {
                    totalCount
                  }
                }
                pullRequestContributionsByRepository(maxRepositories: 100) {
                  repository {
                    name
                    owner {
                      login
                      avatarUrl
                    }
                    isPrivate
                    isFork
                  }
                  contributions {
                    totalCount
                  }
                }
                pullRequestReviewContributionsByRepository(maxRepositories: 100) {
                  repository {
                    name
                    owner {
                      login
                      avatarUrl
                    }
                    isPrivate
                    isFork
                  }
                  contributions {
                    totalCount
                  }
                }
              }
            }
          }
        `
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
}
