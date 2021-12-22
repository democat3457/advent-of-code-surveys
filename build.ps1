if (Test-Path ./docs) {
  Remove-Item ./docs -Recurse
}

New-Item -ItemType Directory ./docs
New-Item -ItemType Directory ./docs/2018
New-Item -ItemType Directory ./docs/2019
New-Item -ItemType Directory ./docs/2020
New-Item -ItemType Directory ./docs/2021

Copy-Item ./src/*.* ./docs
Copy-Item ./2018/results-sanitzed.json ./docs/2018/
Copy-Item ./2019/results-sanitzed.json ./docs/2019/
Copy-Item ./2020/results-sanitzed.json ./docs/2020/
Copy-Item ./2021/results-sanitzed.json ./docs/2021/