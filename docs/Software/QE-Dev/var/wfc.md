# Wavefunctions
* wavefunction은 `Modules/wavefunction.f90`에 정의.
* `evc`변수를 사용하며 `save_buffer`, `get_buffer`를 통해 각 k-point의 값을 읽거나 작성.
## evc
* 크기: `(npwx*npol, nbnd)`
* 읽기: `CALL get_buffer(evc, nwordwfc, iunwfc, iks)`
* 쓰기: `CALL save_buffer(evc, nwordwfc, iunwfc, iks)`
### 물리적 의미
Wavefunction 중 Bloch function의 계수 $c_{n\mathbf{k}}(\mathbf{G})$  
* Wavefunction 표현식:
$$
\psi_{n\mathbf{k}}(\mathbf{r}) = u_{n\mathbf{k}}(\mathbf{r}) e^{i\mathbf{k}\cdot\mathbf{r}}
$$
* Bloch function 표현식:
$$
u_{n\mathbf{k}}(\mathbf{r}) = \sum_{\mathbf{G}} c_{n\mathbf{k}}(\mathbf{G}) e^{i\mathbf{G}\cdot\mathbf{r}}
$$