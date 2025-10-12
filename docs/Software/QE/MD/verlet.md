---
toc_max_heading_level: 2
---
# verlet algorithm
### Acceleration[^1]
$$\mathbf{a}(t) = \frac{\mathbf{F}(t)}{m}$$
[^1]: https://github.com/QEF/q-e/blob/qe-7.3.1/PW/src/dynamics_module.f90#L278-L280
### tau_new[^2]
$$\mathbf{\tau}_\text{new} = \mathbf{\tau}(t) + \mathbf{v}(t)\Delta t + \frac{1}{2}\mathbf{a}(t)\Delta t^2$$
### tau_old[^2]
$$\mathbf{\tau}_\text{old} = \mathbf{\tau}(t) - \mathbf{v}(t)\Delta t + \frac{1}{2}\mathbf{a}(t)\Delta t^2$$
[^2]: https://github.com/QEF/q-e/blob/qe-7.3.1/PW/src/dynamics_module.f90#L284-L299
### Center of mass (delta)[^3]
$$\mathbf{\tau}_\text{any} \larr \mathbf{\tau}_\text{any} + \frac{1}{M}\sum_{\text{atom}} {m(\mathbf{\tau}_\text{any}-\mathbf{\tau}(t))}$$
[^3]: https://github.com/QEF/q-e/blob/qe-7.3.1/PW/src/dynamics_module.f90#L303-L322
### position[^4]
1. dump mdtrj
2. update position

$$\mathbf{\tau}(t+\Delta t) = \mathbf{\tau}_\text{new}$$
[^4]: https://github.com/QEF/q-e/blob/qe-7.3.1/PW/src/dynamics_module.f90#L411-L415
---
