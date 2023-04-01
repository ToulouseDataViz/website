#!/bin/bash
# adapted from http://unix.stackexchange.com/a/157594/110635
# and http://unix.stackexchange.com/a/220619/110635
W=1024
H=768
SIZE_TEST="%[fx:(h>$H && w>$W)]"'\n'

#echo $files
find src static -type f \( -name \*.png -o -name \*.jp* -o -name \*.webm \) | while read f; do 
   if [ $(identify -format "$SIZE_TEST" "$f") = 1 ]; then
   echo "Should be resized: $f"
    #mogrify -resize ''"$W"x"$H"'' "$f"
  #else
    #echo "Do not resize: $f"
  fi
done
  