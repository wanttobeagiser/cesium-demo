declare module 'copy-webpack-plugin' {
    import { Plugin } from 'webpack';

    interface CopyOptions {
        from: string | string[];
        to?: string;
        toType?: 'dir' | 'file' | 'filegroup';
        force?: boolean;
        context?: string;
        globOptions?: {
            ignore?: string[];
            dot?: boolean;
            gitignore?: boolean;
        };
        // 可以根据需要添加更多选项
    }

    interface CopyWebpackPluginOptions {
        patterns: CopyOptions[];
        options?: {
            concurrency?: number;
        };
    }

    export default class CopyWebpackPlugin {
        constructor(options: CopyWebpackPluginOptions);
    }
}
