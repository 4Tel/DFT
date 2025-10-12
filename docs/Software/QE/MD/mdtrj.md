# `.mdtrj`
## 구성
* 각 line은 아래 요소로 구성[^1]
* line과 line 사이는 빈 줄로 구분
* Cell과 Atomic positions는 XYZ 좌표.
```
1. Time (ps)
2. 온도 (K)
3. Total energy (Ry)
4. Unit cell (3x3, Angstrom)
5. Atomic positions (3 x N, Angstrom)
```

[^1]: https://github.com/QEF/q-e/blob/qe-7.3.1/PW/src/dynamics_module.f90#L2060-L2091

