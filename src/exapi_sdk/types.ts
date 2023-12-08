interface Review {
  author: {
    login: string;
  };
  createdAt: string;
  state: string;
}
interface PullRequest {
  repository: {
    name: string;
    owner: {
      login: string;
    };
  };
  createdAt: string;
  mergedAt: string;
  additions: number;
  deletions: number;
  reviews: {
    edges: Review[];
  };
}
interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}
export interface PullRequestEdge {
  cursor: string;
  node: PullRequest;
}
interface SearchResponse {
  edges: PullRequestEdge[];
  pageInfo: PageInfo;
}
export interface GraphQLResponse {
  data: {
    search: SearchResponse;
  };
}

export interface GithubUser {
  login: string;
  id: number;
  name: string;
  email: string;
}
