#!/bin/sh


# 设置颜色变量
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 定义提交信息规范函数
check_commit_message() {
    commit_msg="$1"
    echo $commit_msg c22
    # 检查提交信息是否以指定的前缀开头
    if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore|ci):"; then
        echo -e "${RED}Inappropriate commit message:" "${NC}$1" >&2
        echo -e "${RED}Error:${NC} Commit message format is incorrect. It should start with one of '${BLUE}feat|fix|docs|style|refactor|test|chore|ci:${NC}'." >&2
        exit 1
    fi
}


    commit_msg=$(git show --format=%B -s)
    check_commit_message "$commit_msg"


echo -e "${BLUE}Commit message check passed.${NC}\n"
