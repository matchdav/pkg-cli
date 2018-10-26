# pkg-ops

## wtf?

I do a lot of things through the command line.  

Why not?

## usage examples

```
$ pkg set version 1.2.3
$ pkg keys scripts # surprisingly useful, like gulp -T
commit
lint
$ pkg script lint "eslint src"
$ pkg get scripts
{ commit: 'git-cz', lint: 'eslint src' }
$ pkg get name author
{ name: 'pkg-ops', author: 'matchdav' }
```