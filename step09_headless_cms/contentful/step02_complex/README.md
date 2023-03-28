# Using Contentful Headless CMS with Next.js 13

In this step we will learn how to fetch richtext, images, and references from Contentful.

Create Blog Content Type in Contentful with the following fields and types:

Title: Text

Description: Richtext

Created: Date

Img: Media

Creator: User

Create User Content Type in Contentful with the following fields and types:

Name: Text

Img: Media

Create multiple entries per content type that were created above.

Now use Postman to query for the entry data.

Create a Next.js page to query the content and display it.

For reference I have added response.json file in this directory which is the
response I received from contentful.

https://www.npmjs.com/package/@contentful/rich-text-react-renderer

    npm i @contentful/rich-text-react-renderer






