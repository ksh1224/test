<h1>1. 해결 전략</h1>
해당 과제에서 react의 함수형 컴포넌트, hook과 유사하게 개발하고자 노력했습니다. <br><br>
1. html, css 요소를 ts에서 컨트롤 할 수 있게 개발<br/>
2. 상태 변화에 대해서 특정 요소만 변경시킬 수 있게 개발<br/>
3. 전체적으로 명확한 타입을 가지게끔 개발<br/>
4. 글로벌한 상태값은 되도록이면 지양하여 개발<br/>
5. 익스플로러를 제외한 모든 브라우저에서 작동하는 웹 기술만 사용<br/><br>

<h1>2. 프로젝트 구조</h1>

- [public](./public) : 아웃풋
- [src](./src) : 소스코드
  - [__test__](./src/__test__) : 테스트 코드
  - [components](./src/components) : 페이지 요소
  - [animations](./src/components) : 애니메이션 요소
  - [hooks](./src/hooks) : 재사용 함수
  - [pages](./src/pages) : 페이지
  - [store](./src/store) : 글로벌 상태 관리
  - [styles](./src/styles) : 스타일
  - [types](./src/types) : 데이터/요소 타입
  - [utils](./src/utils) : 여러(dom, 라우터 등) 유틸
- [static](./static) : 정적 파일
  <br><br>

<h1>3. 트러블슈팅</h1>

1. dom 유틸을 만들때 요소에 대한 validation 처리와 중첩을 시키는 부분에서 문제가 있었는데 재귀를 사용하여 해결하였고 reactNode와 유사하게 배열과 엘리먼트 텍스트를 구분하여 넣을 수 있도록 처리했습니다.
2. 원래라면 observer pattern을 도입했었지만 함수형으로 개발중에서 도입하기 힘들다고 판단되어 useChangeElement과 flux pattern으로 변경하였습니다.
3. useChangeElement에서 Element를 변경하는데 innerHTML을 사용하면 html만 넣어주어 사용하던 이벤트나 넣어놓은 함수가 씹히는 문제가 있었는데 replaceWith로 해당 요소를 바꾸는 기능을 그대로 가져가 바꾸는 것으로 해결하였습니다.
4. 초기 개발에서 너무 한페이지에 많은 것들이 들어있어 요소를 분리시키고 훅으로 기능을 분리시켰습니다.
5. 컴포넌트와 훅, 파일로 코드 분리 완료
6. reducer에 해당 로직을 분리 완료
7. 에러 핸들링
8. 인터벌 시간 수정
9. 그밖에 오류 수정
   <br><br>

<h1>4. 개선필요사항</h1>

1. ~~innerHTML 쓰는 방식보다 개선되긴했지만 변경에 대한 요소를 알아서 찾는게 아니라 따로 만들어 쓰고있어 코드 분리가 완전하게 안되고 있어 개선이 필요합니다.~~
2. ~~1번과 유사한데 store에서 변경된 상태값을 가진 뷰를 자동으로 변경시키는게 아니라 dispatcher 내부에서 라우팅이나 렌더링을 시키고 있습니다. 데이터 관리의 기능만 되어야하는 reducer에 해당 로직을 분리하여야 합니다.~~
   <br><br>
