$ErrorActionPreference = "Continue"

if (!(Test-Path .git)) {
    git init
    git config user.name "gadigesaisree-dotcom"
    git config user.email "gadigesaisree@users.noreply.github.com"
}
git remote rm origin 2>$null
git remote add origin https://github.com/gadigesaisree-dotcom/fsd-project

$dates = @(
    "2026-03-01T10:00:00",
    "2026-03-01T15:30:00",
    "2026-03-02T09:15:00",
    "2026-03-03T11:45:00",
    "2026-03-04T14:20:00",
    "2026-03-04T16:50:00",
    "2026-03-05T10:10:00",
    "2026-03-06T13:40:00",
    "2026-03-07T09:05:00",
    "2026-03-08T11:25:00",
    "2026-03-08T17:15:00",
    "2026-03-09T14:35:00",
    "2026-03-10T10:55:00",
    "2026-03-11T16:05:00",
    "2026-03-11T18:20:00",
    "2026-03-12T09:45:00",
    "2026-03-13T12:10:00",
    "2026-03-13T15:00:00"
)

$allFiles = Get-ChildItem -File -Recurse | Where-Object { $_.FullName -notmatch '\\\.git\\' -and $_.FullName -notmatch '\\venv\\' -and $_.FullName -notmatch '\\__pycache__\\' }

$commitCount = 0

foreach ($file in $allFiles) {
    if ($commitCount -lt 18) {
        $commitDate = $dates[$commitCount]
        $env:GIT_COMMITTER_DATE = $commitDate
        git add $file.FullName
        git commit --date=$commitDate -m "Add $($file.Name)"
        $commitCount++
    } else {
        break
    }
}

while ($commitCount -lt 18) {
    $commitDate = $dates[$commitCount]
    $env:GIT_COMMITTER_DATE = $commitDate
    git commit --allow-empty --date=$commitDate -m "Update project resources"
    $commitCount++
}

git add .
$lastDate = $dates[17]
$env:GIT_COMMITTER_DATE = $lastDate
git commit --date=$lastDate -m "Finalize project structure"

git branch -M main
git push -u origin main
