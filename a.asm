.include "m8515def.inc"
.def temp = r18
.def n = r21
.def temp = r19
.def fac_n_minus_1 = r20

start:
    ldi temp,low(RAMEND)
    out SPL,temp
    ldi temp,high(RAMEND)
    out SPH,temp

    ldi r16, 5
    mov temp, r16
    rcall factorial

factorial:
    ; simpan temp dan temp-1
    push n
    push temp

    base_case: ; cek temp == 0
        tst temp
        breq end ; jika temp == 0, maka return 1

    reccursive_case:
        mov n, temp
        dec temp ; hitung temp - 1
        rcall factorial

        mul n, fac_n_minus_1 ; temp * factorial(temp-1)
        mov fac_n_minus_1, r0 ; simpan hasil perkalian di fac_n_minus_1
        rjmp return_function

    end:
        ldi fac_n_minus_1, 1 ; factorial(0) = 1

    return_function:
        pop temp ; restore temp ke nilai semula
        pop n ; restore temp-1 ke nilai semula
        ret

forever:
    rjmp forever

temp = 5
| ADDRESS | VALUE |
|---------|-------|
|   ..... | ..... |
|   0x25E |  5    |  ; nilai temp
|   0x25F |  4    |  ; nilai temp-1

temp = 4
| ADDRESS | VALUE |
|---------|-------|
|   ..... | ..... |
|   0x25C |  4    |  ; nilai temp
|   0x25D |  3    |  ; nilai temp-1

temp = 3
| ADDRESS | VALUE |
|---------|-------|
|   ..... | ..... |
|   0x25A |  3    |  ; nilai temp
|   0x25B |  2    |  ; nilai temp-1

temp = 2
| ADDRESS | VALUE |
|---------|-------|
|   ..... | ..... |
|   0x258 |  2    |  ; nilai temp
|   0x259 |  1    |  ; nilai temp-1

temp = 1
| ADDRESS | VALUE |
|---------|-------|
|   ..... | ..... |
|   0x256 |  1    |  ; nilai temp
|   0x257 |  0    |  ; nilai temp-1

