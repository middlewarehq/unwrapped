import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { capitalize } from '@/utils/stringHelpers';
import { fetchDataFromApi } from '@/utils/axios';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';
import { useLocalStorage } from 'usehooks-ts';
import { useRouter } from 'next/router';

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

  return (
    <div className="items-center justify-center p-4 min-h-screen w-full flex flex-col gap-10 text-center">
      <div>
        <h2 className="text-3xl ">
          Hi <span className="text-violet-300">{userName}</span>
          👋
        </h2>
        <h2 className="text-2xl">
          🚀 Let&apos;s unwrap your GitHub journey of 2023! 🎉
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <div>
          <h2 className="text-xl">Commit Contributions</h2>
          <p className="text-l">
            You nailed it with {userSummaryStats?.totalCommitContributions}{' '}
            contributions across{' '}
            {userSummaryStats?.totalRepositoriesWithContributedCommits} repos,
            beating all commitment issues.
          </p>
        </div>
        <div>
          <h2 className="text-xl">Issue Contributions</h2>
          <p className="text-l">
            A true bug hunter! You opened{' '}
            {userSummaryStats?.totalIssueContributions} issues across{' '}
            {userSummaryStats?.totalRepositoriesWithContributedIssues} repos,
            identifying and addressing challenges.
          </p>
        </div>
        <div>
          <h2 className="text-xl">Pull Request Contributions</h2>
          <p className="text-l">
            Master of collaboration! You submitted{' '}
            {userSummaryStats?.totalPullRequestContributions} PRs across{' '}
            {userSummaryStats?.totalRepositoriesWithContributedPullRequests}{' '}
            repos, shaping projects with your expertise.
          </p>
        </div>
        <div>
          <h2 className="text-xl">Pull Request Review Contributions</h2>
          <p className="text-l">
            Your critical eye at work! You provided insightful reviews on{' '}
            {userSummaryStats?.totalPullRequestReviewContributions}
            pull requests.
          </p>
        </div>
        <div>
          <h2 className="text-xl">Repos with Contributed Commits</h2>
          <p className="text-l">
            Coding across repos! Your commits left a mark in{' '}
            {userSummaryStats?.totalRepositoriesWithContributedCommits}{' '}
            repositories.
          </p>
        </div>
      </div>
      <div>
        <button
          className="bg-indigo-800 text-white px-4 py-2 rounded-md"
          onClick={() => {
            router.push('/stats-unwrapped');
          }}
        >
          Create Unwrapped Images✨
        </button>
        <div className="mt-4 text-sm text-gray-400">
          Keep up the fantastic work 🚀
        </div>
      </div>
    </div>
  );
}
