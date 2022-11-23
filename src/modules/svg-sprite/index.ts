function requireAll(r: any) {
    r.keys().forEach(r);
}

// @ts-ignore
requireAll(require.context('../../img/', true, /\.svg$/));
