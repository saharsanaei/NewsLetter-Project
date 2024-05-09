import 'dotenv/config';
import { getRssResult } from './services/rss/index.js';
import { sendHtmlMail } from './services/mail/index.js';

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

  async function sendNewsletter() {
    try {
      const feed = await getRssFeed(rssFeedurl);
      // const filteredFeed = feed.filter(item => item.content.toLowerCase().includes(' ai '))
      // const newsBody = filteredFeed.map(item => {
        const newsBody = feed.map(item => {
        return `
        <div>
          <h2><a href="${item.link}">${item.title}</a></h2>
          <p><strong>Published:</strong> ${item.pubDate}</p>
          <div>
              <p>${item.contentSnippet}</p>
          </div>
          <p><a href="${item.link}">Read more</a></p>
          <div>
              <p><strong>Feed Provider:</strong> <a href="${item.provider.link}">${item.provider.name}</a></p>
              <p><strong>Last Updated:</strong>${item.provider.lastBuildDate}</p>
          </div>
        </div>
        `;
      })
      // convert feeds array of object into a html content
      let emailHtml = `<div>${newsBody}</div>`;
      const mailRecipients = ['sanaie.sahar@gmail.com'];
      const mailResponse = await sendHtmlMail(mailRecipients, 'Newsletter', emailHtml);
      
      return mailResponse;
    } catch (error) {
      console.error(error);
    }
  }
  
  sendNewsletter()
    .then(response => console.log(response))
    .catch(error => console.error(error));
  