#!/bin/bash
# adapted from http://unix.stackexchange.com/a/157594/110635
# and http://unix.stackexchange.com/a/220619/110635
W=1280
H=800
SIZE_TEST="%[fx:(h>$H && w>$W)]"'\n'

while test $# -gt 0
do
    case "$1" in
        -c) 
            echo "convert files!"
            convert="true"
            ;;
        *) echo "-c to convert"
            exit 0
            ;;
    esac
    shift
done

find src static -type f \( -name \*.png -o -name \*.jp* -o -name \*.webm \) | while read f; do 
   if [ $(identify -format "$SIZE_TEST" "$f") = 1 ]; then
   file_size_kb=`du -k "$f" | cut -f1`
   file_info=$(identify -format "%wx%h\n" "$f")
   echo "Will be resized: $f ($file_size_kb kB) $file_info"
   if [ ! -z "$convert" ];
   then
    # see https://developers.google.com/speed/docs/insights/OptimizeImages
    mogrify -sampling-factor 4:2:0 -strip -quality 85  -resize ''"$W"x"$H"'' "$f"
   fi
  fi
done
  