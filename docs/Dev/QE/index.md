---
sidebar_position: 0
---
# 구성
* 참고[^1][^2]
## 주요 변수
### Plane-waves
* $N_{\text{pw}}$: Number of plane-waves
### G-vectors
* $N_{\text{g}}$: Number of G-vectors
* Modules/gvecw.f90 (wave / smooth grid / dfftp)
* Modules/recvec.f90 (charge / dense grid / dffts)
### FFT grid
* $N_{\text{1}},N_{\text{2}},N_{\text{3}}$
### Structure
* $N_{\text{at}}$
### States
* $N_{\text{bnd}}$
### Projectors
* $N_{\text{p}}$
### k-points
* $N_{\text{k}}$
## 라이브러리
### Core Modules
* UtilXlib: MPI 병렬 처리
* FFTXlib: FFT 분산 병렬 처리. PW, G-vecs, grid 등 데이터 보유.
* LAXlib: dense matrix diagonalization. (ELPA, SCALapack, custom)
* KS Solvers: iterative diagonalization. (block Davidson, block CG)
* LRlib: task connection with DFPT or Many-Body Perturbation.
* upflib: pseudo-potential related.
* devXlib: utils for GPU execution.
### Core Package
* PWscf
* Atomic
* CP
### L1 Package
* Phonon
* NEB
* PWcond
### L2 Package
* GIpaw
* TDDFPT
* Xspectra
* GWL
* HP?
* QEHeat?
### External
* SaX
* WanT
* Wannier90
* PLUMED
* YAMBO


[^1]: https://github.com/QEF/q-e/tree/qe-7.3.1
[^2]: https://www.openmp.org/wp-content/uploads/OMP-seminar.pdf