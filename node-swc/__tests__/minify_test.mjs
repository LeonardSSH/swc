import swc from "../..";

it("should compress", async () => {
    const { code } = await swc.minify(`
    import foo from '@src/app';
    console.log(foo)
    `);

    expect(code).toMatchInlineSnapshot(
        `"import o from\\"@src/app\\";console.log(o)"`
    );
});

it("should accept object", async () => {
    const { code } = await swc.minify(
        `
    import foo from '@src/app';
    console.log(foo)
    `,
        {}
    );

    expect(code).toMatchInlineSnapshot(
        `"import o from\\"@src/app\\";console.log(o)"`
    );
});

it("should accept { mangle = true }", async () => {
    const { code } = await swc.minify(
        `
    import foo from '@src/app';
    console.log(foo)
    `,
        {
            compress: false,
            mangle: true,
        }
    );

    expect(code).toMatchInlineSnapshot(
        `"import o from\\"@src/app\\";console.log(o)"`
    );
});

it("should accept { mangle = object }", async () => {
    const { code } = await swc.minify(
        `
    import foo from '@src/app';
    console.log(foo)
    `,
        {
            compress: false,
            mangle: {
                topLevel: true,
            },
        }
    );

    expect(code).toMatchInlineSnapshot(
        `"import o from\\"@src/app\\";console.log(o)"`
    );
});

it("should mangle locals", async () => {
    const { code } = await swc.minify(
        `
    (function(){
        const longName = Math.random() + '_' + Math.random();
        console.log(longName);
        console.log(longName);
        console.log(longName);
        console.log(longName);
        console.log(longName);
        console.log(longName);
    })()
    `,
        {
            compress: false,
            mangle: {
                topLevel: true,
            },
        }
    );

    expect(code).toMatchInlineSnapshot(
        `"(function(){const o=Math.random()+\\"_\\"+Math.random();console.log(o);console.log(o);console.log(o);console.log(o);console.log(o);console.log(o)})()"`
    );
});

describe("source map", () => {
    it("should have `names`", async () => {
        const { map } = await swc.minify(
            `
        (function(){
            const longName = Math.random() + '_' + Math.random();
            console.log(longName);
            console.log(longName);
        })()
        `,
            {
                sourceMap: true,
                compress: false,
                mangle: {
                    topLevel: true,
                },
            }
        );

        expect(JSON.parse(map)).toHaveProperty("names");
        expect(JSON.parse(map).names).not.toEqual([]);
    });

    it("should have `sources` if file name is specified", async () => {
        const { map } = await swc.minify(
            {
                "foo.js": `(function(){
                const longName = Math.random() + '_' + Math.random();
                console.log(longName);
            })()`,
            },
            {
                sourceMap: true,
                compress: false,
                mangle: {
                    topLevel: true,
                },
            }
        );

        const j = JSON.parse(map);
        expect(j).toHaveProperty("sources");
        expect(j.sources).not.toEqual([]);
    });
});

describe("transform apis", () => {
    it("handle jsc.minify", async () => {
        const { code } = await swc.transform(
            `
        (function(){
            const longName = Math.random() + '_' + Math.random();
            console.log(longName);
            console.log(longName);
            console.log(longName);
            console.log(longName);
            console.log(longName);
            console.log(longName);
        })()
        `,
            {
                jsc: {
                    minify: {
                        compress: false,
                        mangle: {
                            topLevel: true,
                        },
                    },
                },
                minify: true,
            }
        );

        expect(code).toMatchInlineSnapshot(
            `"(function(){var o=Math.random()+\\"_\\"+Math.random();console.log(o);console.log(o);console.log(o);console.log(o);console.log(o);console.log(o)})()"`
        );
    });
});

describe("should remove comments", () => {
    it("should remove", async () => {
        const { code } = await swc.minify(
            `
        (function(){
            /**
             * 1
             */
            const longName = Math.random() + '_' + Math.random();
            console.log(longName);
        })()
        `,
            {
                compress: false,
                mangle: {
                    topLevel: true,
                },
            }
        );

        expect(code).toMatchInlineSnapshot(
            `"(function(){const n=Math.random()+\\"_\\"+Math.random();console.log(n)})()"`
        );
    });

    it("should preserve licnese", async () => {
        const { code } = await swc.minify(
            `
        (function(){
            /**
             * @license
             */
            const longName = Math.random() + '_' + Math.random();
            console.log(longName);
        })()
        `,
            {
                compress: false,
                mangle: {
                    topLevel: true,
                },
            }
        );

        expect(code).toMatchInlineSnapshot(`
            "(function(){/**
                         * @license
                         */ const n=Math.random()+\\"_\\"+Math.random();console.log(n)})()"
        `);
    });
    it("should remove comment near to  licnese", async () => {
        const { code } = await swc.minify(
            `
        (function(){
            /**
             * @license
             */
             /*
              * 1
              */
            const longName = Math.random() + '_' + Math.random();
            console.log(longName);
        })()
        `,
            {
                compress: false,
                mangle: {
                    topLevel: true,
                },
            }
        );

        expect(code).toMatchInlineSnapshot(`
            "(function(){/**
                         * @license
                         */ const n=Math.random()+\\"_\\"+Math.random();console.log(n)})()"
        `);
    });
});
