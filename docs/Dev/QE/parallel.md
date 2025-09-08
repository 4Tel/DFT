# 병렬화
* 참고[^1]
## OpenMP
* 하나의 executable이 여러 subprocess (thread) 생성.
* 일부 코드에 적용.
## MPI
* 각 CPU가 executable 복사본 실행.
* 각 복사본이 private 데이터 보유. (메모리 요구 증가)
* `mpirun` 또는 `mpiexec` 명령으로 실행.
  * Processor 수 등을 옵션으로 지정.
* Quantum ESPRESSO 옵션을 통해 병렬화 수준 지정.
* 예: `mpirun -np 8 ./pw.x -nk 2 -i my.input`
### world
* 파일: `mp_world`
* 변수: `nnode`, `nproc`
### images
* 옵션: `-nimage`, `-ni`
* 서로 다른 image (구조)
* 파일: `mp_image`
* inter: `nimage`, `my_image_id`, `inter_image_comm`
* intra: `nproc_image`, `me_image`, `root_image`, `intra_image_comm`
### pools
* 옵션: `-npools`, `-nk`
* 동일 image
* 서로 다른 k-point
* 파일: `mp_pool`
* inter: `npools`, `my_pool_id`, `inter_pool_comm`, 
* intra: `nproc_pool`, `me_pool`, `root_pool`, `intra_pool_comm`
### bands
* 옵션: `-nband`, `-nb`
* 동일 k-point
* 서로 다른 Kohn-Sham orbitals.
  * orbitals 대신 bands, wave functions, states 등으로도 불림.
* Hybrid Functional인 경우 특히 유용.
* 파일: `mp_bands`
* inter: `npools`, `my_pool_id`, `inter_pool_comm`, 
* intra: `nproc_pool`, `me_pool`, `root_pool`, `intra_pool_comm`
### PW
* 옵션 없음.
* pool에 독립적?
* $N_\text{image} \times N_\text{pool} \times N_\text{bands} \times N_\text{PW} = N_\text{proc}$
### tasks
* 옵션: `-ntg`, `-nt`
* FFT plane보다 processor가 많은 경우.
* 각 FFT가 여러 band를 처리.
* 안되면 FFT subdivision 사용.
* $N_\text{task} \times N_\text{FFT} = N_\text{PW}$
### Linear-Algebra
* 옵션: `-ndiag`, `-northo`, `-nd`
* 대각화(SCF) 및 정규직교(CP) 병렬화.
* PW, pool과 독립적.
* 요구 값: $N_\text{diag}=m^2 \le N_\text{PW}$ (PW보다 적은 수의 제곱수)
* 파일: `mp_diag`

## TODO
* `intra_image_comm`과 `inter_pool_comm` 차이
* `intra_bgrp_comm` 및 `inter_bgrp_comm` 예시

[^1]: https://www.quantum-espresso.org/Doc/user_guide/node20.html