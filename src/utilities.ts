import generate, { type GeneratorResult } from '@babel/generator'
import { parse,type ParseResult } from "@babel/parser";
import traverse, { type NodePath } from "@babel/traverse";
import type { JSXAttribute, File } from "@babel/types"
import type { Options, Extensions } from "./types"

const defaultIgnorePaths: string[] = [
    // Node.js
    'node_modules',
  
    // Git
    '.git',
  
    // IDE configurations
    '.idea', // JetBrains IDEs (e.g., WebStorm)
    '.vscode', // Visual Studio Code
  
    // OS generated files
    '.DS_Store', // macOS
    'Thumbs.db', // Windows
  
  
    // Configuration files
    '.env', // Environment variables
  
    // Logs
    'logs',
    '*.log',
  
    // Vue.js
    '.nuxt', // Nuxt.js generates this folder
  
    // React.js
    '.next', // Next.js generates this folder
  
    // Remix.js
    '.remix', // Remix.js cache
  
    // Angular
    'e2e', // End-to-end tests in Angular
    'angular.json', // Angular CLI configuration
    'browserslist', // Browser compatibility list for Angular
  
    '.cache', // Cache files for various tools
  ];

export function getOptions(options: Options): Options {
    return {
        extensions: getExtensions(options.extensions),
        ignoreFolders: Array.isArray(options.ignoreFolders) ? options.ignoreFolders : [],
        ignoreFiles: Array.isArray(options.ignoreFiles) ? options.ignoreFiles : [],
        attributes: Array.isArray(options.attributes) ? options.attributes : [],
    }
}

export function getIgnoredPaths(options: Options): string[] {
    const inValidPaths: string[] = [ ".", "./", "/", "/." ];
    const ignoredFolders: string[] = cleanIgnoredPaths(options.ignoreFolders || [], inValidPaths).filter(path => isFolder(path))
    const ignoredFiles: string[] = cleanIgnoredPaths(options.ignoreFiles || [], inValidPaths).filter(path => isFile(path))
    const ignoredPaths: string[] = ignoredFolders.concat(ignoredFiles)

    return ignoredPaths;
}

function getExtensions(extensions: Extensions): Extensions {
    const validExtensions: string[] = [ "tsx", "jsx" ]

    if (Array.isArray(extensions)) {
        const filteredExtensions: ("jsx" | "tsx")[] = extensions.filter((ext: string) => validExtensions.includes(ext));
        return filteredExtensions as Extensions;
    }
    return [];
}

export function isString(path: string): boolean {
    if (!path || typeof path != "string") {
        return false;
    }

    return true;
}

export function cleanString(path: string): string {
    let cleanedPath: string = path.trim();
    cleanedPath = cleanedPath.startsWith("./") ? path.substring(2) : cleanedPath;

    return cleanedPath
}


export function hasIgnorePath(id: string, paths: string[] = []): boolean {
    const ignoredPaths: string[] = [
        ...paths,
        ...defaultIgnorePaths
    ]
    return ignoredPaths.some((path: string) => id.includes(path));
}

export function cleanIgnoredPaths(paths: string[], inValidPaths: string[]): string[] {
    return [
        ...new Set(
            paths.filter((path: string) => !inValidPaths.includes(path) && isString(path) && cleanString(path).length).map(path => cleanString(path))
        )
    ]
}

export function isFile(path: string): boolean {
    if (!path.length || path.length < 3) {
        return false;
    }

    const parts: string[] = path.split('/');

    const fileName: string = parts[parts.length - 1];
    const fileExtension: string[] = fileName.split('.').filter(c => c);

    if (fileExtension.length < 2 || fileName.length < 3 || fileName.includes('/')) {
        return false;
    }

    return true;
}

export function isFolder(path: string): boolean {
    if (isFile(path)) return false;

    // Check for valid characters - alphanumeric, underscore, dash, dot and slash are allowed
    const validCharacters: RegExp = /^[a-zA-Z0-9_.-/]*$/;
    return validCharacters.test(path);
}

export function hasExtension(id: string, options: Options): boolean {
    const extensionsRegex: RegExp = new RegExp(`\\.(${options.extensions.join('|')})$`, 'i');
    return extensionsRegex.test(id)
}

export function removeAttributes(code: string, attributes: string[]): string {
    const ast: ParseResult<File> = parse(code, {
        sourceType: 'module',
        plugins: [ 'typescript', 'jsx' ]
    });

    traverse(ast, {
        JSXAttribute(path: NodePath<JSXAttribute>): void {
            const attrName: string = <string>path.node.name.name
            if (attributes.includes(attrName)) {
                path.remove();
            }
        }
    });

    const output: GeneratorResult = generate(ast, {}, code);
    return output.code;
}