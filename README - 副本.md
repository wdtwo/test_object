# 代码同步



```bash
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add test git@github.com:wdtwo/test_object.git
git push -u test main
git pull test
git add .
git commit -m 123
git push test
```






```bash
git branch -m main master
git fetch origin
git branch -u origin/master master
git remote set-head origin -a
```