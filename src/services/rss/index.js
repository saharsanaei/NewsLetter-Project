import Parser from 'rss-parser';
let parser = new Parser();

export async function getRssResult(url){
    const feed = await parser.parseURL(url);
    return feed; 
}