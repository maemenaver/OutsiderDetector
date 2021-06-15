# OutsiderDetector

누가 집 근처에서 오고 있으면 알려줍니다.

## 실행 전 해야할 것

-   모든 작업을 하기 전에 sudo -s 명령어를 입력하여 root에서 실행하도록 합니다.
-   프로젝트 설치
    -   git clone https://github.com/maemenaver/OutsiderDetector.git
-   파이썬 설치
    -   pip install --pre scapy[basic]
    -   ModuleNotFoundError: No module named 'scapy' 문제가 발생할 경우
    -   python3 -m pip install --pre scapy[basic]
-   nestJS 설치
    -   node 설치 (V12.21.0 ~ V16.0 작동 확인)
        -   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
        -   source ~/.bashrc
        -   nvm install v14.17.1
    -   npm install

## 실행

-   npm run start
