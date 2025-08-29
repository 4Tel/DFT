---
toc_max_heading_level: 4
---
# 데이터 파일
* 최종 데이터는 `outdir`의 `prefix.save` 폴더에 저장 된다. [^1]
## 목록
* 아래와 같은 파일들이 저장된다.
* [`data-file-schema.xml`](#data-file-schemaxml)
* Psuedopotential 복사본.
* [`charge-density.dat`](#charge-densitydat)
* [`wfcN.dat`](#wfcndat)

---

### `data-file-schema.xml`
* xml 파일 구성 형식은 github 저장소[^2]에서 찾을 수 있다.

---

### `charge-density.dat`
* [Binary 파일](#binary-파일)
#### 구성
```fortran showLineNumbers
gamma_only, ngm_g, nspin
b1, b2, b3
mill(1:3, 1:ngm_g)
rho(1:ngm_g, 1)
 ...
rho(1:ngm_g, nspin)
```
##### `gamma_only`
* Type: `Logical`
##### `ngm_g`
* Type: `Integer`
* Number of G-vectors
##### `nspin`
* Type: `Integer`
* `1` for unpolarized
* `2` for collinear
* `4` for noncollinear
##### `b1(3), b2(3), b3(3)`
* Type: `Real(8)`
* **Primitive** reciprocal lattice vectors
* atomic units?
##### `mill(3, ngm_g)`
* Type: `Integer`
* Miller indices
* `h=mill(1,:)`
* `k=mill(2,:)`
* `l=mill(3,:)`
* $G = hb_1+ kb_2 + lb_3$
##### `rho_g(ngm_g, nspin)`
* Type: `Complex(8)`
* Charge Density in |e| units.
* 적분 결과는 N (전자 개수). (-N|e|가 아님.)

---

### `wfcN.dat`
* [Binary 파일](#binary-파일)
* `N`은 k-point index.
* Kohn-Sham orbitals를 포함.
#### 구성
```fortran showLineNumbers
ik, xk, ispin, gamma_only, scalef
ngw, igwx, npol, nbnd
b1, b2, b3
mill(1:3, 1:igwx)
evc(1:npol*igwx, 1)
 ...
evc(1:npol*igwx, nbnd)
```
##### `ik`
* Type: `Integer`
* k-point index
##### `xk(3)`
* Type: `Real(8)`
* k-point coordinates
* units?
* coordinates?
##### `ispin`
* Type: `Integer`
* spin index for LSDA case.
* 1 for spin-up
* 2 for spin-down
* LSDA가 아닌 경우 1
##### `gamma_only`
* Type: `Logical`
##### `scalef`
* Type: `Real(8)`
* Scale factor of wavefunctions
##### `ngw`
* Type: `Integer`
* Number of plane waves (PW)
##### `igwx`
* Type: `Integer`
* Max number of PW
* 이유는 알 수 없으나 ngw보다 큰 경우도 존재.
##### `npol`
* Type: `Integer`
* Number of spin states.
* 2 for noncollinear case.
* 1 for otherwise.
##### `nbnd`
* Type: `Integer`
* Number of wavefunctions. (states of electrons)
##### `b1(3), b2(3), b3(3)`
* Type: `Real(8)`
* **Primitive** reciprocal lattice vectors
* units?
##### `mill(3,ngm_g)`
* Type: `Integer`
* Miller indices
* `h=mill(1,:)`
* `k=mill(2,:)`
* `l=mill(3,:)`
* $G = hb_1+ kb_2 + lb_3$
##### `evc(npol*igwx, nbnd)`
* Type: `Complex(8)`
* Wavefunctions in PW basis set.
* For noncollinear case, 각 PW 요소는 spin 요소를 포함.
* `evc(1:igwx,:)`는 up spin
* `evc(igwx+1:2*igwx,:)`는 down spin

---

## wfc 파일
* 참고[^3]
### 파일 형식
* 병렬 실행 시 각 프로세서는 필요한 데이터 slice를 보유해야 한다.
* 이 데이터는 필요에 따라 계산 중, 혹은 계산 후 저장될 수 있다.
#### Collected Format
* `outdir/prefix.save/wfcN.dat` 파일.
* 모든 slice를 하나의 프로세서로 모아 디스크에 하나의 파일로 작성한다.
* 프로세서 수나 distribution에 무관한 데이터가 작성된다.
* v6.2부터 최종 데이터는 collected format으로 저장된다.
#### Portable Format
* `outdir/prefix.save/wfcN.hdf` 파일.
* Collected Format과 동일하나, 차이점이 있다.
* 하나의 파일이 아니라 여러 파일로 존재할 수 있다.
* 데이터 파일을 복사하여 여러 machine이 접근할 수 있도록 한다.
* 사용하려면 `-D__HDF5` 옵션을 통해 HDF5 library를 적용하여야 한다.
#### Distributed Format
* `outdir/prefix.wfcN` 파일. (`N`은 프로세서 index)
* 각 프로세서가 필요한 데이터 slice를 디스크에 작성한다.
* 빠르고 간단한 형식이다.
* 프로세서 수와 병렬화 수준에 의존적이다.
* 다른 job 실행 시에도 접근할 수 있어야 한다. <br/> 모든 processor가 모든 파일에 접근할 수 있어야 한다.
### 주의사항
* `outdir`은 병렬 파일 시스템인 것이 바람직하다.
* 불가피한 경우 비병렬 단일 파일 시스템을 사용할 수 있다.
* 분산 파일 시스템을 사용할 경우 어떤 영향이 생길 지 예측할 수 없다.
### `disk_io`
* `low`: 계산 중에는 wavefunction을 disk에 적재하지 않고 RAM에 보유.
* `medium`: 계산 중에도 wavefunction을 disk에 적재. (RAM 부족 시)
* `none`: 계산 후 wavefunction을 disk에 적재하지 않음.
---

## Binary 파일
* 파일 내용은 병렬화 수준과 무관하게 작성된다.
* Fortran을 이용해 쉽게 읽을 수 있다.
* HDF5 옵션과 함께 컴파일한 경우 `.dat` 형식 대신 `.hdf5` 형식으로 저장된다.

---
[^1]: https://gitlab.com/QEF/q-e/-/wikis/Developers/Format-of-data-files
[^2]: https://github.com/QEF/qeschemas/blob/master/PW_CPV/qes_current_master.xsd
[^3]: https://www.quantum-espresso.org/Doc/user_guide/node21.html