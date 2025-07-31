# Spin
## nspin
* 1: Spinless Calculation
* 2: Spin Polarized Calculation
* 4: Noncollinear Calculation

---

## lsda_mod
* module for Local Spin Density Approximation
### lsda
* `lsda`와 `nspin==2`는 동치이다.

---

## noncollin_module
* `noncollin_module`은 Noncolliear Case 계산 수행을 돕는다.
### noncolin
* `noncolin`과 `nspin==4`는 동치이다.
### evc
* `evc`의 1번째 차원은 `npwx*npol` 크기이다.
#### npol
* `noncolin`이 아닌 경우 `npol`은 1이며, `noncolin`인 경우 `npol`은 2가 된다.
* `npwx`는 PW-basis의 개수를 의미하며, `noncolin`인 경우 basis은 2배가 된다.
#### npw
* `npwx`는 PW-basis의 최대 개수이며, 각 `k`는 서로 다른 개수를 보유할 수 있다.
* 각 `k`가 보유한 PW-basis의 개수는 다를 수 있다.
* 이는 `npw = ngk(current_k)`로 동기화 한다.
#### 연산
* `evc` 배열은 초과 할당 되므로 `noncolin` 연산 시 남는 공간이 생긴다.
* `npw:npwx` 공간의 여백으로 인한 자원 소모를 줄이기 위해 다음을 고려한다
<Tabs>
    <TabItem value="Invalid" label="Invalid">
    ```fortran
    evc_sum(1:npwx*npol) = evc1(1:npwx*npol) + evc2(1:npwx*npol)
    ```
    </TabItem>
    <TabItem value="valid" label="Valid">
    ```fortran
    evc_sum(1:npw) = evc1(1:npw) + evc2(1:npw)
    IF (noncolin) evc_sum(npwx+1:npwx+npw) = evc1(npwx+1:npwx+npw) + evc2(npwx+1:npwx+npw)
    ```
    </TabItem>
</Tabs>

---

## wavefunctions
### evc
* `evc`의 3번째 차원은 `nks` 크기이다.
* `lsda`인 경우 `nks`가 2배가 된다.
* 각 `current_k`는 `up` 또는 `dw`를 담고 있다.
* QE의 호출 호환성을 위해 `IF (lsda) current_spin=isk(current_k)`를 수행해야 한다.
### rho
* `lsda`인 경우 rho 배열은 버전에 따라 다른 값을 담는다.  
* [QE Release Notes](https://github.com/QEF/q-e/blob/develop/Doc/release-notes) 참고

<Tabs>
    <TabItem value="6.4 이전" label="v6.4 이전">
    ```
    (up, dw)
    ```
    </TabItem>
    <TabItem value="6.4 이후" label="v6.4 이후">
    ```
    (up+dw, up-dw)
    ```
    </TabItem>
</Tabs>
