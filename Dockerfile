FROM ubuntu:latest
LABEL authors="thirstypooch"

ENTRYPOINT ["top", "-b"]