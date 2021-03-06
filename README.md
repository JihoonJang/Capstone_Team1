<h2>1. 타이틀: 시각장애인을 위한 점자 교육기기</h2></br></br>
프로젝트 개요</br>
프로젝트 명 : 점비스</br>
프로젝트 목표 : IOT를 활용한 시각장애인의 효과적인 점자 학습</br>
프로젝트 참여자 : 장지훈, 양원준, 안시현, 정재헌</br>
기능</br>
- 자음과 모음, 자주 쓰이는 단어를 점자로 변환</br>
- 음성을 녹음하여 점자로 변환</br>
- 텍스트를 사진으로 촬영하여 점자로 변환</br>
- 효과적인 학습을 위한 Quiz</br></br>
<h2>2. Pain point, 사람들이 어떻게 문제를 회피하고 있는가</h2></br>
후천적 시각장애인 비율이 90%가 넘는 현 상황에서 갑작스러운 사고나 질병으로 시각 장애인이 된 사람들이 쉽고 편하게 점자를 배우기 위한 도구가 마땅치 않고, 그 결과로 시각장애인의 점자 문맹률은 95%에 달한다.</br>
정부24, 한국시각장애인연합회 등 장애인 복지를 위한 점자교육을 시행하는 기관을 찾아보았으나 일부 지역에 국한되어있음을 알 수 있었다. 점자 교육의 필요성은 느끼지만 제대로 제공되지 않는 현 상황에서 지역과 남녀노소 상관없이 교육이 가능한 매체가 필요하다고 느꼈다.</br></br>
<h2>3. 무엇을 만드는가, 왜 만드는가?</h2></br>
시각 장애인의 점자 문맹률은 95%로 매우 높지만, 점자 교육에 대한 접근성은 낮다. 이러한 문제를 해결하기 위해 스마트폰 앱을 통해 자음 연습, 모음 연습, 낱말 연습을 선택한 후, 점자 표현 기기를 통해 사용자가 점자를 익힐 수 있는 서비스를 제공한다. 또한 사진 또는 텍스트를 실시간으로 점자로 변환해주는 서비스를 제공하여 시각장애인의 아날로그 정보 접근성을 높인다.</br></br> 
<h2>4. 시스템 구성도</h2> 
</br>(1) 아두이노 카메라 모듈(OV7670)을 이용하여 텍스트를 사진으로 찍은 후 서버로 전송
</br>(2) Google Vision API를 이용하여 사진으로부터 텍스트 추출
</br>(3) 텍스트를 서버의 MySQL DB에 저장
</br>(4) 서버에서 Python 한글 점자변환 라이브러리 hbcvt를 이용하여 텍스트를 점자 데이터로 변환
</br>(5) 아두이노는 서버로부터 점자 데이터를 받은 후, 스텝모터의 회전각을 조절하여 점자 표현 (스텝모터의 다중 제어는 Arduino Mega 2560을 통해 구현)
</br>(6) 화살표 버튼을 누르면 아두이노는 이전 텍스트를 서버에 요청하여 점자 데이터를 얻음
</br>    * 점자 생성 방법은 아래 사진과 같음 
</br>


![점자생성기_대지1](https://github.com/JihoonJang/CapstoneDesign/blob/master/%EC%A0%90%EC%9E%90%EC%83%9D%EC%84%B1%EA%B8%B0_%EB%8C%80%EC%A7%80%201.jpg)
</br></br>
<h2>5. 데이터 흐름도</h2>
</br>


![점자생성기_03](https://github.com/JihoonJang/CapstoneDesign/blob/master/%EC%A0%90%EC%9E%90%EC%83%9D%EC%84%B1%EA%B8%B0_03.jpg)
</br>
</br>사용자가 점자로 읽고 싶은 것을 사진으로 찍어 전송 
</br>-> Vision API를 통해 텍스트로 변환 (ML 기반) 
</br>-> 텍스트를 서버의 DB에 저장, 추후 검색 기능에 활용
</br>-> 서버에서 텍스트를 점자로 변환한 후 아두이노로 전송
</br>-> 점자 표현 및 제공
</br>

<h2>6. 결과</h2></br>
https://www.youtube.com/watch?v=0I2d0GjfmNE

