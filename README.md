# tiny-stack-vm-22

A tiny stack VM for make.fun's "Build a tiny stack virtual machine, 22 November 2026" bounty. One program (`main.ts`, Node 22) runs all 40 instances: it reads `/input/<id>/program.bin` + `input.bin` and writes `/output/<id>/stdout.bin` + `exit.txt`. Implements the full ISA: 32-bit wrapping arithmetic, 256-value stack, branches, calls, 256 words of memory, input/output, all 10 traps with their exact exit codes, plus the step and output limits. Practice score 1,000,000/1,000,000 (house baseline plain-vm 1.0.0: 670,000).
