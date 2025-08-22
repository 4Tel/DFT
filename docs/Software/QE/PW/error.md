# 오류 해결하기
## l too large, or wrong number of Ylm required
* 참고[^1]
### 원인1
* Pseudopotential에서 보유한 l값이 너무 큰 경우
* QE 소스코드 중 `upflib/ylmr2.f90`에서 `maxl` 수정 후 다시 컴파일.
### 원인2
* Ylm의 개수가 잘못된 경우
* 다른 Pseudopotential 사용


[^1]: https://github.com/QEF/q-e/blob/qe-7.3.1/upflib/ylmr2.f90#L35-L45