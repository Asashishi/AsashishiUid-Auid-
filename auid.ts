class Auid {

    // 基础随机空间
    static #bLength: number = 3;
    // 数组化存储 避免频繁 gc
    static #fbArrB: string[] = new Array(Auid.#bLength);
    static #bufferB: Uint8Array = new Uint8Array(Auid.#bLength);

    static #length16: number = 16;
    static #fbArr16: string[] = new Array(Auid.#length16);
    static #buffer16: Uint8Array = new Uint8Array(Auid.#length16);

    static #length32: number = 32;
    static #fbArr32: string[] = new Array(Auid.#length32);
    static #buffer32: Uint8Array = new Uint8Array(Auid.#length32);

    // 兼容浏览器 跨语言可以考虑 ns % 1e9 来获取偏移
    static #gTimeOffsetB36(): string {
        // 启动时间到当前的差值 仅取 ns 偏移值(对浏览器环境有特殊兼容 精度不如 bun 或者 node 环境)
        // 36进制 每秒回拨 在单进程上理论碰撞概率为0 在多进程上进一步扩大随机熵
        if (typeof process !== 'undefined' && process.hrtime) 
            return process.hrtime()[1]!.toString(36).toUpperCase().padStart(6, '0');
        // 以微秒精度取偏移值
        crypto.getRandomValues(Auid.#bufferB);
        const µs: number = (performance.now() * 1000 | 0) % 1_000;
        const µsB36: string = µs.toString(36).toUpperCase().padStart(3, '0');
        for (let i: number = 0; i < Auid.#bLength; i++)
            // 用于快速补足随机空间后三位
            Auid.#fbArrB[i] = (Auid.#bufferB[i]! % 36).toString(36).toUpperCase();
        return µsB36 + Auid.#fbArrB.join('');
    }

    public static gen16(): string {
        crypto.getRandomValues(Auid.#buffer16);
        // ms 时间戳 36 进制
        const msB36: string = Date.now().toString(36).toUpperCase().padStart(9, '0');
        for (let i: number = 0; i < Auid.#length16; i++)
            // 会损失半个字节的随机熵 但是较为均匀
            Auid.#fbArr16[i] = (Auid.#buffer16[i]! % 36).toString(36).toUpperCase();
        // Auid 随机空间 36^16 约 2^82 32位字符 (9位时间戳(ms) + - + 6位时间偏移(ns) + 16个36进制随机数)
        return msB36 + '-' + Auid.#gTimeOffsetB36() + Auid.#fbArr16.join('');
    }

    public static gen32(): string {
        crypto.getRandomValues(Auid.#buffer32);
        const msB36: string = Date.now().toString(36).toUpperCase().padStart(9, '0');
        for (let i: number = 0; i < Auid.#length32; i++)
            Auid.#fbArr32[i] = (Auid.#buffer32[i]! % 36).toString(36).toUpperCase();
        // Auid 随机空间 36^32 约 2^165 48位字符 (9位时间戳(ms) + - + 6位时间偏移(ns) + 32个36进制随机数)
        return msB36 + '-' + Auid.#gTimeOffsetB36() + Auid.#fbArr32.join('');
    }
};

export default Auid;
