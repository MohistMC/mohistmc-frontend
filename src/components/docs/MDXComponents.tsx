// src/components/docs/MDXComponents.tsx
import React from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/gruvbox-dark';

const MDXComponents = {
    // 标题组件
    h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
        <h1 className="text-3xl md:text-4xl font-bold my-6" {...props} />
    ),
    h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
        <h2 className="text-2xl md:text-3xl font-bold my-5" {...props} />
    ),
    h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
        <h3 className="text-xl md:text-2xl font-bold my-4" {...props} />
    ),
    h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
        <h4 className="text-lg md:text-xl font-bold my-3" {...props} />
    ),

    // 段落组件
    p: (props: React.HTMLProps<HTMLParagraphElement>) => (
        <p className="my-3 text-base md:text-lg whitespace-pre-wrap" {...props} />
    ),

    // 链接组件
    a: (props: React.HTMLProps<HTMLAnchorElement>) => (
        <a className="link link-primary text-base md:text-lg" {...props} />
    ),

    // 列表组件
    ul: (props: React.HTMLProps<HTMLUListElement>) => (
        <ul className="list-disc list-inside my-2 text-base md:text-lg" {...props} />
    ),
    li: (props: React.HTMLProps<HTMLLIElement>) => (
        <li className="my-1 text-base md:text-lg" {...props} />
    ),

    // 引用组件
    blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
        <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-base md:text-lg" {...props} />
    ),

    // 表格组件
    table: (props: React.HTMLProps<HTMLTableElement>) => (
        <div className="overflow-x-auto my-6 rounded-lg border border-base-300 shadow-sm">
            <table className="min-w-full border-collapse" {...props} />
        </div>
    ),
    thead: (props: React.HTMLProps<HTMLTableSectionElement>) => (
        <thead {...props} />
    ),
    th: (props: React.HTMLProps<HTMLTableCellElement>) => (
        <th
            className="border border-base-300 px-4 py-3 text-center text-sm font-semibold text-base-content bg-base-200 uppercase tracking-wider"
            {...props}
        />
    ),
    td: (props: React.HTMLProps<HTMLTableCellElement>) => {
        const { children, ...rest } = props;
        // 检查子元素是否是特殊符号
        return (
            <td
                className="border border-base-300 px-4 py-3 text-sm text-base-content text-left align-middle"
                {...rest}
            >
                {children}
            </td>
        );
    },
    tr: (props: React.HTMLProps<HTMLTableRowElement>) => (
        <tr className="even:bg-base-200/30 hover:bg-base-300/50 transition-colors" {...props} />
    ),
    tbody: (props: React.HTMLProps<HTMLTableSectionElement>) => (
        <tbody {...props} />
    ),

    // 代码组件
    code: (props: { [x: string]: any; children: any; className: any; }) => {
        const { children, className, ...rest } = props;
        const match = /language-(\w+)/.exec(className || '');

        // 内联代码
        if (!match) {
            return (
                <code className="bg-base-200 text-base-content px-1.5 py-0.5 rounded text-xs md:text-sm font-mono" {...rest}>
                    {children}
                </code>
            );
        }

        // 代码块
        return (
            <div className="rounded-lg">
                <div className="flex items-center justify-between px-4 py-2 bg-base-200 dark:bg-base-700 text-base-content">
                    <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-error"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-warning"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-success"></div>
                    </div>
                </div>
                <SyntaxHighlighter
                    language={match[1]}
                    PreTag="div"
                    style={dracula}
                    className="m-0 [&_*]:!rounded-none [&_*]:!bg-transparent [&_*]:!border-none [&_*]:!outline-none [&_pre]:!m-0 [&_code]:!p-0"
                    showLineNumbers={false}
                    customStyle={{
                        margin: 0,
                        borderRadius: '0 0 0.5rem 0.5rem',
                        padding: '1rem',
                        whiteSpace: 'pre',
                        wordBreak: 'normal',
                        overflow: 'auto'
                    }}
                    codeTagProps={{
                        style: {
                            fontSize: '0.875rem',
                            lineHeight: '1.5'
                        },
                    }}
                    {...rest}
                >
                    {typeof children === 'string' ? children.trim() : String(children)}
                </SyntaxHighlighter>
            </div>
        );
    },

    pre: (props: { children: any; }) => {
        // 将pre标签的处理委托给code组件
        return <>{props.children}</>;
    },

    // 其他组件
    div: (props: React.HTMLProps<HTMLDivElement>) => <div {...props} />,
    input: (props: React.HTMLProps<HTMLInputElement>) => (
        <input className="input input-bordered" {...props} />
    ),
};

export default MDXComponents;