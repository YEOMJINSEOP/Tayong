0. Python 3.7~3.9 버전 설치하기 

1. AWS CLI2 설치
-Windows

 https://awscli.amazonaws.com/AWSCLIV2.msi

-MacOS

다음 두 명령어를 실행한다.

$ curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
$ sudo installer -pkg AWSCLIV2.pkg -target /

2. aws configure

* linux, macos, windows 동일

$ aws configure
AWS Access Key ID [None]: 엑세스키값
AWS Secret Access Key [None] : 시크릿키값
Default region name [None] : ap-northeast-2
Default output format [None] : json

3.
-windows 
1)가상환경 생성
python -m venv tayong
2)가상환경 실행
tayong\Scripts\activate.bat

-macos
1)가상환경 생성
$ sudo pip install virtualenv
$ virtualenv tayong
2)가상환경 실행
$ source tayong/bin/activate

4.모듈설치
$ pip install --upgrade pip
$ pip install flask
$ pip install zappa

5. 깃허브에서 받은 폴더를 가상환경 tayong 내부 경로에 넣어 주세요.
 
6. 로컬에서 테스트

cd\zappa_test1
python run.py test

localhost:4000에 들어가서 확인해보면 페이지 뜹니다.


6.