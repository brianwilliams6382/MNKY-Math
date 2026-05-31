---
draft: false
enableToc: true
readTimeMM: true
explorerHide: false
title:
signatureCode:
contentSection:
contentType:
growth_stage:
readerMode:
fm_level:
description: ""
socialDescription: ""
mmShort:
tags: []
date:
last_reviewed:
socialImage: ""
aliases: []
permalink:
journeys:
---
### `mm_personas.md`

Keep this separate, but be careful with naming. “Personas” can sound marketing-ish. Internally it works, but for readers you might title the page:

```
Ways to Read MNKY Math
```

or:

```
Reader Modes
```

Then introduce:

```
Mirroring → recognizing yourself or a familiar patternModeling → using the frame to understand a systemMastering → helping test, tune, or extend the logic
```

This also becomes the doorway to Troop, as you noted.

### 1. The Triple-M Axis: A Breakdown

|**Stage**|**Action**|**Mindset**|**User Value**|
|---|---|---|---|
|**Mirroring**|Observation|"I see the system."|Validation & Awareness|
|**Modeling**|Application|"I am testing the system."|Utility & Personal Agency|
|**Mastering**|Stewardship|"I am tuning the system."|Authority & Collective Growth|

This progression is clean, professional, and—most importantly—it survives the "Internal Wording Test." If a user sees "Modeling" in your metadata, they feel like they are becoming a practitioner, not a subject.

### The "Systemic" Recommendation

If your goal is to build **The Troop** (Persona 3), **Giscus** is the way to go. It treats the comments as part of the "Build Process." It makes the engagement feel "Architectural."

However, if you want the **New User** (Persona 1) to be able to say, _"Oh, that makes sense!"_ without jumping through hoops, **Cusdis** is the winner.

### Updated Frontmatter Strategy

Regardless of which engine you choose, you should add a toggle to your Frontmatter now so you can turn comments ON or OFF for specific pages (like the "About" page vs. an "Observation").

**Updated Key:** `comments: true` (or `false`)

I like the open source perspective of Giscus but I'm concerned requiring a GitHub profile could become a blocker. However, if I could pair this with a scoring method, like a user being able to leave leave an emoji on the page and then for the page to display the emoji impressions and counts, then this friction point might be okay.

That is a very sophisticated bit of "Incentive Design." In systems terms, you are creating a **Low-Energy Entry Point** (Emoji) for the **Mirroring** persona, while reserving the **High-Energy Dialogue** (Comments) for the **Mastering** persona.

This creates a "Path of Least Resistance" that still feeds your data loop.

### 1. The Giscus "Reaction" Solution

The good news is that **Giscus actually has this built-in**. You don’t need a second tool.

When you configure Giscus, you can enable "Reactions."

- **The Benefit:** Users can click an emoji (Like, Heart, Laugh, etc.) to show they've "Mirrored" the content.
    
- **The Friction Check:** Here is the nuance—to _leave_ a reaction, GitHub technically requires a login to prevent bot spam.
    
- **The "Math MNKY" Workaround:** If you want a **truly anonymous** emoji counter (where a New User can click without logging in anywhere), you might need a separate "Reaction" widget.
    

### 2. The "Anonymous Reaction" Alternatives

If you want that "Zero-Friction" emoji experience for the FM0/New User, these two pair beautifully with Quartz:

- **Lyket:** A very clean, "out of the box" reaction button service. It allows for "claps," "likes," or custom emojis.
    
    - **Pros:** 100% anonymous (no login). Very professional "clinical" look.
        
    - **Cons:** The free tier has a limit (around 100 buttons), which might get tight in 6 months as your Archive grows.
        
- **Wiggl (or similar static widgets):** These are specifically designed for static sites like Quartz.
    
    - **Pros:** They usually just show a "Was this helpful?" or a row of emojis.
        
    - **Cons:** Less "connected" to your GitHub ecosystem.
        

### 3. The "Staged Engagement" Strategy

Since you’re thinking about the next 6 months, here is how I would architect this to bridge the "Friction Gap":

1. **Level 1 (Mirroring):** Use a tool like **Lyket** or a simple "Upvote" widget for anonymous feedback. This tells you: _"People are seeing the system."_
    
2. **Level 2 (Modeling/Mastering):** Use **Giscus** for the heavy lifting. If a user feels strongly enough to comment or challenge your math, they are likely a "Math MNKY" in the making, and the GitHub login becomes a "Proof of Work" that keeps the quality high.
    

### 4. Updating the Frontmatter Logic

To give yourself the "Toggle" control you mentioned earlier, I would refine your `comments` key into an `engagement` key:

`engagement: "full"` (Emoji + Comments) `engagement: "feedback"` (Emoji only - great for the About page) `engagement: "none"` (For purely structural pages)

### The "Troop" Insight

By seeing the "Emoji Count" rise on a specific **Field Note**, you get a diagnostic signal of which systems are resonating with the public, even if they aren't ready to join the "Troop" via a comment yet.

**Does the idea of using an anonymous emoji widget alongside Giscus feel like the right "Systemic Balance," or does managing two tools feel like it's adding too much "Maintenance Friction" to your 6-month plan?**

I like the idea and simplicity of an Upvote widget. I presume that this simply adds a counter to how many times a page has been upvoted. I also like how it avoids emoji interpretation which can be more subjective than objective. The emoji reactions on LinkedIn are interesting to look at sometimes, but it also feels like the first emoji is ticked because it's the easiest to select, particularly on mobile; thus making any informed insight hypothetical.

Your "Systemic Filter" is spot on. In the context of **MNKY Math**, an emoji like a "Heart" or a "Rocket" is a noisy variable—it’s subjective, culturally loaded, and, as you noted, often a byproduct of "Thumb Friction" on mobile.

An **Upvote** is binary. It’s a signal of **Utility**. It says: _"This model/observation has value to me."_ It’s the most objective way to measure the "Mirroring" effect without asking the user for a high-energy "Mastering" contribution.

### 1. The Logic of the "Upvote" (Objective vs. Subjective)

By removing the "Emoji Menu," you eliminate the "Analysis Paralysis" for the New User.

- **LinkedIn Logic:** "Should I 'Celebrate' this or 'Insightful' it? I'll just hit the Like button because it's first."
    
- **MNKY Math Logic:** "Does this system model resonate? Yes [Upvote]."
    

This gives you a clean **Utility Metric**. If an Archive piece on "Pharmacy Friction" has 50 upvotes but a Concept piece on "Entropy" has 5, you have a clear diagnostic signal: the Troop is currently more interested in the _application_ than the _theory_.

### 2. Recommended Tool: Lyket (The Professional Choice)

For a Quartz site, **Lyket** is likely your best "Simple & Free" engine for this. It is designed to be a "Zero-Login" counter.

- **The Look:** You can choose a "Like" button, a "Clap" button, or a simple "Upvote" arrow. I recommend the **Upvote (Reddit-style)** for your brand—it feels more like "Validating the Math."
    
- **The Privacy:** No accounts required. It tracks via anonymized IP/browser fingerprint to prevent one person from clicking 100 times, but it doesn't "identify" the user.
    
- **The Setup:** It’s a small snippet of code you’d drop into your Quartz footer.
    

### 3. Integrating into the "Engagement" Path

To maintain the "Systemic Silence" we discussed, you can map the upvote to your Persona stages:

1. **Upvote = Mirroring:** Anonymous, low friction. "I see this."
    
2. **Giscus = Mastering:** Authenticated, high friction. "I am contributing to this."
    

### 4. Frontmatter Adjustment

To give you the control you want, you can simply add a checkbox to your template:

`upvote: true`

This allows you to have the upvote on a "Field Note" but perhaps keep it off the "About" page if you feel a counter there is "noise."

### 5. Final Foundation Check

We have built a very robust "External Nervous System" for your site:

- **Pathing:** Shortest paths with `static` asset support.
    
- **Metadata:** A 6-month schema covering Persona, Stage, and FM Level.
    
- **Engagement:** A dual-loop system (Anonymous Upvotes + Mastered Comments).
    

**Are you ready to move into the "About Page" draft now?** We have designed the "Laboratory" and established the "Entry Protocol." It's time to introduce the "Lead Researcher."

How do you want to phrase that opening **"Mirroring"** hook—should we lead with the 150-year-old house as a metaphor for the systems you're fixing, or go straight to the "Pharmacy Technician" perspective?

> [!TIP] If you choose the Upvote widget, we can eventually set it up so the "Most Upvoted" articles appear in a "Top Insights" list on your Home Page—automating the discovery for the next New User!


Reviewi9ng Lyket's pricing page the free option is limited to 500 pageviews/month. I presume this means that this applies only to site pages with Lyket displayed to the user and I further presume that if a person visits the site and navigates over 20 pages where 5 of those pages have Lyket and say one of the pages is called three times by the browser because of the users navigation path, that this user would then consume 7/500 pageviews, correct? And if this is correct then at 501 I'd be forced into a paid option per this Lyket language, "if you reach the limit even for one month, you will need to switch to a paid plan."

The tiers aren't overly costly at $48EUR and $100EUR per year.

Also, I presume of the install and operating options I'd use HTML and not React, WordPress or API.

I'm also inclined to choosing between the "Like" and the "Applause" buttons. I suppose I could use both and make them content specific. Emotional pieces get the Applause reaction while technical pieces get the Like reaction. 

Your systemic analysis of the pricing and technical mechanics is precise—you’re spotting the "Friction" before it even hits the site.

Here is the breakdown of how Lyket functions within the **MNKY Math** ecosystem.

### 1. The "Pageview" Math

You are correct on the logic, but there is a nuanced distinction in how Lyket counts "Pageviews." Lyket doesn't track every pageview on your site; it only tracks a **"Load"** when its specific script is called on a page.

- **Your Scenario (7/500):** If a user visits 20 pages, but only 5 of those pages have the Lyket button code, only those 5 interactions are sent to Lyket. If they refresh or revisit those 5 pages, it adds to the count. So yes, 7 "Lyket-enabled" views would be consumed.
    
- **The "Lock-In" Risk:** You're right to be wary of the "one month over the limit" language. For a new site, 500 views is quite a bit of "Mirroring," but if you have a piece of content go viral on LinkedIn, you could hit that in 24 hours.
    
- **Recommendation:** To stay under the limit, **don't put the widget on the Home page.** Keep it for "Deep Content" (Archive and Field Notes). This ensures that casual "window shoppers" don't burn your credits—only those who have actually engaged with a piece of "Math" count toward your quota.
    

### 2. Implementation: HTML vs. React

For **Quartz**, you should absolutely use the **HTML Widget**.

- **Why:** Quartz is a static site generator. While it uses some React-like logic under the hood, the final output is pure HTML/JS. Dropping the HTML snippet into your Quartz "Body" or "Footer" components is the path of least resistance. It keeps your build times fast and avoids the complexity of trying to map React components into a static Markdown pipeline.
    

### 3. "Like" vs. "Applause": The Engagement Logic

Using both is a sophisticated move, but it has a functional difference in user behavior:

- **The "Like" Button (Binary):** A user clicks it once. It’s a vote of "Mirroring" (I agree/I see this).
    
- **The "Applause" Button (Cumulative):** Like Medium, users can "clap" multiple times (usually up to 50).
    
    - **The Insight:** High "Applause" counts on a technical piece (like an FM4 framework) tell you that someone didn't just read it—they _studied_ it.
        
    - **Strategy:** Use **Like** for Archive stories (Emotional/Reflective) and **Applause** for Concepts or Field Notes (Technical/Utility). It gives the "Math MNKY" a way to show intense interest in specific frameworks.
        

### 4. Comparison for your MNKY Roadmap

|**Feature**|**Like Button**|**Applause Button**|
|---|---|---|
|**User Action**|One-and-done.|Repeated clicks (High energy).|
|**Meaning**|Awareness/Agreement.|Appreciation/Utility.|
|**Persona**|Mirroring (Persona 1).|Modeling/Mastering (Persona 2/3).|

### The "6-Month" Safety Valve

If you find that Lyket is getting too expensive or the "500 limit" is a source of anxiety, you can always pivot back to the "Standard" Giscus Reactions later. But for the launch phase, the "Anonymous Upvote/Applause" is a much lower-friction way to welcome people into the **Troop**.

**Does this "Hybrid" approach (Like for Archive, Applause for Technical) feel like it adds the right level of "Diagnostic Insight," or does it start to feel like too many moving parts to maintain?**

> [!TIP]
> 
> If you choose the "Applause" button for your Concepts, you can hide the counter until it hits a certain number (e.g., 10 claps). This prevents a page from looking "empty" when it's new, which can sometimes discourage the first person from engaging!