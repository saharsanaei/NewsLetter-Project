import 'dotenv/config';
import { getRssResult } from './services/rss/index.js';

const rssFeedurl = [
    'https://readwrite.com/feed/?x=1'
];

async function getRssFeed(feedurl) {
    const requests = [];
    feedurl.forEach(url => {
        requests.push(getRssResult(url))
    });


    const feed = await Promise.all(requests);


    const newsletter = [];
    feed.forEach(feed => {
      feed.items.forEach(item => {
        newsletter.push({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          content: item.content,
          contentSnippet: item.contentSnippet,
          provider: {
            name: feed.title,
            link: feed.link,
            lastBuildDate: feed.lastBuildDate,
          }
        });
      });
    });
    return newsletter;

  }
  getRssFeed(rssFeedurl)
  .then(data => console.log(data));
  // async function sendNewsletter() {
  //   try {
  //     const feed = await getRssFeed(rssFeedurl);
  //     const filteredFeed = feed.filter(item => item.content.toLowerCase().includes(' ai '))
  //     const newsBody = filteredFeed.map(item => {
  //       return `
  //       <div style="border: 1px solid #ddd; margin-bottom: 20px; padding: 10px;">
  //         <h2 style="font-size: 16px; margin: 0 0 10px 0;"><a href="${item.link}" style="text-decoration: none; color: #0073e6;">${item.title}</a></h2>
  //         <p style="margin: 0;"><strong>Published:</strong> ${item.pubDate}</p>
  //         <div style="margin-top: 10px;">
  //             <p style="margin: 0;">${item.contentSnippet}</p>
  //         </div>
  //         <p style="margin-top: 10px;"><a href="${item.link}" style="background-color: #0073e6; color: white; padding: 8px 12px; text-decoration: none; border-radius: 4px;">Read more</a></p>
  //         <div style="border-top: 1px solid #eee; padding-top: 10px; margin-top: 10px;">
  //             <p style="margin: 0;"><strong>Feed Provider:</strong> <a href="${item.provider.link}" style="text-decoration: none; color: #0073e6;">${item.provider.name}</a></p>
  //             <p style="margin: 0;"><strong>Last Updated:</strong>${item.provider.lastBuildDate}</p>
  //         </div>
  //       </div>
  //       `;
  //     })
  //     // convert feeds array of object into a html content
  //     let emailHtml = `<div style="font-family: Arial, sans-serif; color: #333;">${newsBody}</div>`;
  //     const mailRecipients = ['sanaie.sahar@gmail.com'];
  //     const mailResponse = await sendHtmlMail(mailRecipients, 'Newsletter', emailHtml);
      
  //     return mailResponse;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
  // sendNewsletter()
  // .then(response => console.log(response))
  // .catch(error => console.error(error));