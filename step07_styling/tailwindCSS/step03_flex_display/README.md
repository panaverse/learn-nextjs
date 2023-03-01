# Quotes Side-by-Side Example with Next.js 13 and Tailwind CSS

In the previous step, we looked at ways you can use Tailwind to control the display of a single DOM element. In this step, we’ll look at how Tailwind can manage the layout of multiple elements.

We will learn layouts with CSS Flex using Tailwind CSS from this [CSS Flex and Grid book](https://shrutibalasa.gumroad.com/l/css-flex-and-grid).


Start by reading pages 21 to 23 and build the [Quotes Side-by-Side Example 1a](https://play.tailwindcss.com/acMVfuSzYE)

Update tailwind.config.js, app/globals.css, and app/page.tsx

Note: Before Updating app/globals.css read the following two articles:

[Functions & Directives in Tailwind CSS](https://tailwindcss.com/docs/functions-and-directives)

[How to use @apply directive in Tailwind-CSS?](https://www.geeksforgeeks.org/how-to-use-apply-directive-in-tailwind-css/)

Understanding Display Flex Concept

Flexbox is a method that helps us arrange elements in one direction (horizontally or vertically) and control their dimensions, alignments, order of appearance and more. For
this, we need at least two elements - a parent element called flex container and at least one child element called flex item.

In our current example, the parent element is the flex container, while .quote elements are the flex items. And as you just saw, adding flex class to any element makes it a flex container.

Note: Only the immediate child elements of the container become flex items. Children of flex items are not affected.




