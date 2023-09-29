:arrow_left: [Index](index.md)

# Git Workflow

> A Git workflow is a recipe or recommendation for how to use Git to accomplish work in a consistent and productive manner.
>
> -- <cite>Atlassian</cite>

Git workflow adopted by backend developers is very closed to **Feature Branch Workflow** briefly summarized as follows:
1. Put yourself on **prd** branch: `git checkout prd`
2. Align your local prd branch with remote: `git pull origin prd`
3. Take trello card name: ex. 1234-great-name
4. Create a new branch for the card: `git checkout -b feature/1234-great-name`
5. Develop the feature: `git add ...` and `git commit ...`
6. Run [code quality tools](code-quality.md) in local environment
7. Push your local branch to Github: `git push origin feature/1234-great-name`
8. Create Github PR from **feature/1234-great-name** to **prd**
9. Put yourself on **demo** branch: `git checkout demo`
10. Align your local demo branch with remote: `git pull origin demo`
11. Merge feature branch on demo: `git merge feature/1234-great-name`
12. Push your local demo branch to Github: `git push origin demo`

:warning: Bullets 9, 10, 11 and 12 deploy your feature in demo environment!

To learn more about the topic:
* [Feature branch workflow](https://docs.gitlab.com/ee/gitlab-basics/feature_branch_workflow.html)
* [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
* [5 Different Git Workflows](https://medium.com/javarevisited/5-different-git-workflows-50f75d8783a7)