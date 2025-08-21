# Band 계산
## qe 문서
* PWscf 문서[^1] 3.3.0.2 참고
* bands는 nscf 계산 중 Kohn-Sham states만 관심이 있는 경우 사용.
* nscf에 기반한 다른 물성을 얻고자 하는 경우 nscf 계산 필요.
## qe 코드
* bands 계산은 `lbands` 변수만 변경됨. [^2]
* (TODO) `lbands`의 영향
* bands 계산이 아니면서 `K_POINTS`를 `tpiba_b`나 `crystal_b`로 할 경우 추가 연산 수행. [^3]



[^1]: https://www.quantum-espresso.org/Doc/pw_user_guide/node10.html
[^2]: https://github.com/QEF/q-e/blob/7fd60c9bc9fe7a7d1fe6f1049f4afba0eab9aeef/PW/src/input.f90#L472
[^3]: https://github.com/QEF/q-e/blob/qe-7.3.1/Modules/qexsd_input.f90#L302-L316
