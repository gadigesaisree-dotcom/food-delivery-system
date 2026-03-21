$ErrorActionPreference = "Continue"

git checkout --orphan delivery
git reset

git remote rm delivery 2>$null
git remote add delivery https://github.com/gadigesaisree-dotcom/food-delivery-system

$dates = @(
    "2026-03-13T10:00:00",
    "2026-03-14T09:15:00",
    "2026-03-15T11:45:00",
    "2026-03-16T14:20:00",
    "2026-03-17T16:50:00",
    "2026-03-18T10:10:00",
    "2026-03-19T13:40:00",
    "2026-03-20T09:05:00",
    "2026-03-21T11:25:00"
)

# 9 dates. So Day 1 (13th) has two commits, making it 10 commits total.
$commitDates = @(
    "2026-03-13T10:00:00",
    "2026-03-13T15:30:00",
    "2026-03-14T09:15:00",
    "2026-03-15T11:45:00",
    "2026-03-16T14:20:00",
    "2026-03-17T16:50:00",
    "2026-03-18T10:10:00",
    "2026-03-19T13:40:00",
    "2026-03-20T09:05:00",
    "2026-03-21T11:25:00"
)

$commitCount = 0
$allFiles = Get-ChildItem -File -Recurse | Where-Object { $_.FullName -notmatch '\\\.git\\' -and $_.FullName -notmatch '\\venv\\' -and $_.FullName -notmatch '\\__pycache__\\' -and $_.FullName -notmatch 'commit_script.ps1' -and $_.FullName -notmatch 'delivery_script.ps1' }

foreach ($file in $allFiles) {
    if ($commitCount -lt 9) {
        $commitDate = $commitDates[$commitCount]
        $env:GIT_COMMITTER_DATE = $commitDate
        git add $file.FullName
        git commit --date=$commitDate -m "Add $($file.Name)"
        $commitCount++
    } else {
        break
    }
}

while ($commitCount -lt 9) {
    $commitDate = $commitDates[$commitCount]
    $env:GIT_COMMITTER_DATE = $commitDate
    git commit --allow-empty --date=$commitDate -m "Update system configuration"
    $commitCount++
}

git add .
$lastDate = $commitDates[9]
$env:GIT_COMMITTER_DATE = $lastDate
git commit --date=$lastDate -m "Finalize delivery system features"

git push -u delivery delivery:main --force
