import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { capitalize } from '@/utils/stringHelpers';
import { fetchDataFromApi } from '@/utils/axios';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';
import { useLocalStorage } from 'usehooks-ts';
import { useRouter } from 'next/router';
import pluralize from 'pluralize';

import GrowthSvg from '@/assets/growth.svg';

export interface ContributionSummaryApiResponse {
  contributionSummary: ContributionSummary;
}

export interface ContributionSummary {
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  totalRepositoriesWithContributedPullRequests: number;
  totalRepositoriesWithContributedIssues: number;
  totalRepositoriesWithContributedPullRequestReviews: number;
  totalRepositoriesWithContributedCommits: number;
}

export default function StatsSummary() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const [userSummaryStats, setUserSummaryStats] =
    useLocalStorage<ContributionSummary | null>(
      'USER_CONTRIBUTION_SUMMARY',
      null
    );

  const userName = useMemo(
    () => capitalize(session?.user?.name?.split(' ')[0]),
    [session?.user?.name]
  );

  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi<ContributionSummaryApiResponse>(
      '/api/github/contribution_summary'
    )
      .then((res) => {
        setUserSummaryStats(res.contributionSummary);
      })
      .finally(() => setIsLoading(false));
  }, [setUserSummaryStats]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-between p-10">
        <LoaderWithFacts />
      </div>
    );
  }

  const okCommits = Number(userSummaryStats?.totalCommitContributions) > 50;
  const okIssues = Number(userSummaryStats?.totalIssueContributions) > 5;
  const okPRs = Number(userSummaryStats?.totalPullRequestContributions) > 5;
  const okReviews =
    Number(userSummaryStats?.totalPullRequestReviewContributions) > 5;
  const okRepos =
    Number(userSummaryStats?.totalRepositoriesWithContributedCommits) > 2;

  const notOk = !(okCommits || okIssues || okPRs || okReviews || okRepos);

  return (
    <>
      <GrowthSvg
        style={{
          position: 'absolute',
          right: '-200px',
          top: 0,
          height: '600px',
          transform: 'rotate(-30deg)',
          opacity: 0.6
        }}
      />
      <div className="relative p-8 min-h-screen w-full flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-6xl font-medium mb-4">
            Hey <span className="text-violet-300">{userName}</span>
            👋
          </span>
          <span className="text-2xl">
            4.5 Billion contributions...
            <br />
            and 2.2 Million of new partners in code later
          </span>
          <span className="text-2xl">2023 is finally at a close</span>
          {!notOk && (
            <span>And damn you&apos;ve gone places, and done things...</span>
          )}
        </div>

        {notOk ? (
          <div className="flex flex-col gap-5">
            <span className="text-2xl">Your year was rather calm!</span>
            <span>
              Maybe there are some surprises your 2023 unwrapped holds?
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {okCommits &&
              !!Number(
                userSummaryStats?.totalRepositoriesWithContributedCommits
              ) && (
                <div>
                  <h2 className="text-xl">You&apos;ve made a dent</h2>
                  <p className="text-l text-gray-400">
                    With {userSummaryStats?.totalCommitContributions}{' '}
                    {pluralize(
                      'commit',
                      userSummaryStats?.totalCommitContributions
                    )}{' '}
                    across{' '}
                    {userSummaryStats?.totalRepositoriesWithContributedCommits}{' '}
                    {pluralize(
                      'repo',
                      userSummaryStats?.totalRepositoriesWithContributedCommits
                    )}
                    , beating all commitment issues.
                  </p>
                </div>
              )}
            {okIssues &&
              !!Number(
                userSummaryStats?.totalRepositoriesWithContributedIssues
              ) && (
                <div>
                  <h2 className="text-xl">
                    You&apos;ve made the internet a better place
                  </h2>
                  <p className="text-l text-gray-400">
                    Because of you, the world knows about{' '}
                    {userSummaryStats?.totalIssueContributions} new issues
                    across{' '}
                    {userSummaryStats?.totalRepositoriesWithContributedIssues}{' '}
                    repos.
                  </p>
                  <p>Might have saved a life even!</p>
                </div>
              )}
            {okPRs &&
              !!Number(
                userSummaryStats?.totalRepositoriesWithContributedPullRequests
              ) && (
                <div>
                  <h2 className="text-xl">A pillar of the community</h2>
                  <p className="text-l text-gray-400">
                    You submitted{' '}
                    {userSummaryStats?.totalPullRequestContributions} PRs across{' '}
                    {
                      userSummaryStats?.totalRepositoriesWithContributedPullRequests
                    }{' '}
                    repos, shaping projects with your expertise.
                  </p>
                </div>
              )}
            {okReviews && (
              <div>
                <h2 className="text-xl">Watchful Guardian</h2>
                <p className="text-l text-gray-400">
                  You provided insightful reviews on{' '}
                  {userSummaryStats?.totalPullRequestReviewContributions} pull
                  requests.
                </p>
              </div>
            )}
            {okRepos && (
              <div>
                <h2 className="text-xl">One with a wide reach</h2>
                <p className="text-l text-gray-400">
                  Hardly in your comfort zone, your commits left a mark in{' '}
                  {userSummaryStats?.totalRepositoriesWithContributedCommits}{' '}
                  repositories.
                </p>
              </div>
            )}
          </div>
        )}
        <div>
          <button
            className="bg-indigo-800 text-white px-4 py-2 rounded-md"
            onClick={() => {
              router.replace('/stats-unwrapped');
            }}
          >
            Unwrap your 2023 {'->'} ✨
          </button>
          {!notOk && (
            <div className="mt-4 text-sm text-gray-400">
              Keep up the fantastic work 🚀
            </div>
          )}
        </div>
      </div>
    </>
  );
}
