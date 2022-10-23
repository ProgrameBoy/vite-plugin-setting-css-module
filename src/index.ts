import type { TransFormFunction, TransFormFunctionQuery, QueryType } from './type';

const urlLang: string = `(#.*)|(\\?.*)$`;
const viteCssModuleMatchRule = '.module';
const ignoreCssModuleMatchRule = 'global';
const cssLangs: string = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`;
const cssLangRE: RegExp = new RegExp(cssLangs);
const cssModuleRE: RegExp = new RegExp(`\\${viteCssModuleMatchRule}${cssLangs}`);
const ignoreModuleRE: RegExp = new RegExp(`\\.${ignoreCssModuleMatchRule}${cssLangs}`);
const ignoreModulePlusRE: RegExp = new RegExp(`\\?${ignoreCssModuleMatchRule}$`);
const urlLangRE: RegExp = new RegExp(urlLang);

const replaceUrl = (url: string): string => {
    url = url.replace(urlLangRE, '');
    return url;
}

const settingRule = (params: TransFormFunctionQuery, url: string) => {
    const { include, exclude } = { ...(params as { include: QueryType, exclude: QueryType }) };
    let isPass: Boolean = true;
    const cleanUrl = replaceUrl(url);
    const getRuleValue = (value: QueryType, type?: string) => {
        let result = true;
        if (value instanceof RegExp) {
            result = type === 'exclude' ? !value.test(cleanUrl) : value.test(cleanUrl);
        }
        if (value instanceof Function) {
            result = value(cleanUrl);
        }
        return result;
    }
    if (url.includes('node_modules') || ignoreModulePlusRE.test(url)) return false;
    isPass = getRuleValue(include) && getRuleValue(exclude, 'exclude')
        && !ignoreModuleRE.test(cleanUrl);
    return isPass;
}

const vitePluginSettingCssModules: TransFormFunction<object> = (params) => {

    return {
        name: 'vite-plugin-setting-css-module',
        enforce: "pre",

        async resolveId(id: string, importer: string, resolveOpts: object) {
            const isNodeModules = id.includes('node_modules')
            if (isNodeModules) return null;

            let fullIdUrl: string | { id: string, external: any } | null = '';

            try {
                fullIdUrl = await this.resolve(id, importer, { skipSelf: true, ...resolveOpts });
            } catch {
                fullIdUrl = id;
            }

            if (fullIdUrl instanceof Object) fullIdUrl = (fullIdUrl as { id: string }).id;
            if (!fullIdUrl) return null;
            if (cssLangRE.test(<string>fullIdUrl)) {
                const isPassRule: Boolean = settingRule((params as {}), fullIdUrl);
                if (!isPassRule) return null;
            }

            if (cssLangRE.test(<string>fullIdUrl) && !cssModuleRE.test(<string>fullIdUrl)) {
                const ext = fullIdUrl.split(cssLangRE);
                const newPathUrl = ext[1] ? `${fullIdUrl}?${viteCssModuleMatchRule}.${ext[1]}` : fullIdUrl;
                return newPathUrl;
            }
            return null;
        }
    }
}

export default vitePluginSettingCssModules;
