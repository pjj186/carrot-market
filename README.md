# Carrot Market

# Use

## NextJS : 강력한 풀스택 프레임워크!

## TailWind : Utility-First 컨셉을 가진 CSS 프레임워크

Tailwind CSS는 유틸리티 퍼스트(Utility-first)를 지향하는 CSS 프레임워크다. CSS를 작성하는 방법론 중 하나인 BEM은 마크업을 컴포넌트 단위로 구분하고 상태에 따라 스타일을 변경하는 식으로 재활용할 수 있도록 한다. <br>
https://tailwindcss.com/

## Prisma : SQL 코드를 쓰지 않고, js코드(typescript도 가능)를 작성해 데이터베이스를 수정할 수 있도록 연결해주는 서비스

Prisma는 기존 ORM과 근본적으로 다른 ORM 이고,
기존 ORM이 겪는 많은 문제들을 겪지 않는다. - prisma docs

- ORM : ORM(Object-relational mapping) 은 DB데이터(schema)를 객체(Object)로 매핑해 주는 역할을 하는 것입니다. 모델링 된 객체와 관계를 바탕으로 SQL을 자동으로 생성해 주는 도구입니다.

- 기존의 SQL 코드보다, JS코드가 훨씬 보기 편하고 단순하기 때문에 효율적인 데이터베이스 관리가 가능하다.

- SQL 같은 데이터베이스 언어를 작성하지않는다!

https://www.prisma.io/

## Planet-Scale

MySQL 호환 Serverless 데이터베이스 플랫폼 <br>
https://planetscale.com/

## React Hook Form

Form을 직접 만드는 건 그렇게 즐거운 일이 아니다! <br>
React Hook Form 을 이용하면 Form을 만드는 시간을 단축할 수 있을것이다! <br>
https://react-hook-form.com/

## Twilo

Twilio
Twilio는 전화 걸기 및 받기, 문자 메시지 보내기 및 받기, 웹 서비스 API를 사용하여 기타 커뮤니케이션 기능 수행을 위한 프로그래밍 가능한 커뮤니케이션 도구를 제공한다.
https://www.twilio.com/

## SendGrid

SendGrid는 거래 및 마케팅 이메일을 위한 고객 커뮤니케이션 플랫폼이다.
<br>
https://sendgrid.com/solutions/email-api/

## Iron-Session

Iron session
데이터를 저장하기 위해 서명되고 암호화된 쿠키를 사용하는 Node.js stateless session 유틸리티.
Next.js, Express, Nest.js, Fastify 및 모든 Node.js HTTP 프레임워크와 함께 작동합니다. 세션 데이터는 암호화된 쿠키("seals")에 저장됩니다. 그리고 당신의 서버만이 세션 데이터를 디코딩(decode)할 수 있습니다. 세션 ID가 없으므로 서버 관점에서 iron session을 "stateless"로 만듭니다.

## NextAuth.js

Next.js에서 Authentication 구현을 도와주는 패키지이다.

## SWR

SWR은 먼저 캐시로부터 데이터를 반환한 후, fetch 요청(재검증)을 하고, 최종적으로 최신화된 데이터를 가져오는 전략입니다. SWR을 사용하면 컴포넌트는 지속적이며 자동으로 데이터 업데이트 스트림을 받게 됩니다. 그리고 UI는 항상 빠르고 반응적입니다.
SWR은 React 프레임워크인 Next.js를 만든 동일한 팀이 만들었습니다.
<br><br>
<strong>useSWR사용하기</strong>

1. JSON 데이터를 사용하는 일반적인 RESTful API라면 먼저 네이티브 fetch의 단순한 래퍼인 fetcher 함수를 생성해야 합니다.
   ex) const fetcher = (...args) => fetch(...args).then(res => res.json())

2. 그 다음, useSWR을 import하고, 함수 컴포넌트 내에서 사용하여 시작하면 됩니다.
   ex) const { data, error } = useSWR('/api/user/123', fetcher)

- 일반적으로, 세 가지 요청 상태가 가능합니다: "loading", "ready", "error". data와 error 값을 사용해 현재 요청의 상태를 알아내고, 해당하는 UI를 반환할 수 있습니다....

## CLOUDFLARE

Cloudflare란?
(클라우드를 위해 만들어진 전역 네트워크)
Cloudflare는 인터넷에 연결하는 모든 것을 안전하고 비밀을 유지하면서 신속하고 안정적으로 연결하도록 설계된 전역 네트워크입니다.
https://www.cloudflare.com/ko-kr/products/cloudflare-images/

Cloudflare Images
대규모로 이미지를 저장, 크기 조정, 최적화하는 하나의 API
Cloudflare Images는 이미지 인프라를 구축하고 유지하는 효율적인 솔루션을 제공합니다. 하나의 통합 제품을 이용해 이미지를 대규모로 저장, 크기 조정, 최적화합니다.

1. 이미지 저장
   아무리 많은 이미지라도 Cloudflare Images에 저장할 수 있습니다.

2. 이미지 크기 조정 및 최적화
   보관 및 크기 조정의 추가 비용 없이 모든 이미지를 조정할 수 있습니다.

3. 전달
   전세계 Cloudflare 데이터 센터에서 이미지를 전달합니다.
