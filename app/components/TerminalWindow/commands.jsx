/**
 * Terminal command registry.
 *
 * To add a command, add ONE entry to the `commands` object below. Each entry is:
 *
 *   name: {
 *     description: "shown next to the command in `help`",   // optional
 *     hidden: true,                                         // optional, hides it from `help`/`all`
 *     run: (ctx) => <JSX/>                                  // returns what to print (or nothing)
 *   }
 *
 * `run` receives a context object with side-effect helpers:
 *   ctx.clear()          - wipe the terminal history
 *   ctx.redirect(url)    - navigate the browser to a url
 *   ctx.playAudio(src)   - play an audio file from /public
 *   ctx.commands         - the full registry (used by `help`/`all`)
 *
 * Anything `run` returns is rendered as-is (React nodes), so you never touch
 * innerHTML and never have to update a list somewhere else.
 */

function Link({ href, children }) {
  return (
    <a className="link" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export const commands = {
  help: {
    hidden: true,
    description: "list the main commands",
    run: (ctx) => (
      <>
        Supported list of commands:{" "}
        {visibleCommandNames(ctx.commands).join(", ")}
      </>
    ),
  },

  all: {
    hidden: true,
    description: "list every command, including the fun ones",
    run: (ctx) => (
      <>All commands available are: {Object.keys(ctx.commands).join(", ")}</>
    ),
  },

  about: {
    description: "who is Josh?",
    run: () => (
      <>
        Hey! I&apos;m Josh, a software developer, and this is my website! On the
        left, you&apos;ll find a few useful links, as well as my latest spotify
        scrobble. You&apos;ll be interacting mostly within this terminal window,
        so feel free to explore 😁
      </>
    ),
  },

  resume: {
    description: "grab my resume",
    run: () => (
      <>
        Click{" "}
        <Link href="https://drive.google.com/file/d/1Fo87zUv7M5n9ghHEIcMWF2YLyAsDqZ73">
          here
        </Link>{" "}
        for my current resume
      </>
    ),
  },

  skills: {
    description: "what I work with",
    run: () => (
      <>
        I would describe myself as a full stack web developer and am proficient
        in: JavaScript, React, Node.js, Express.js along with a plethora of
        other technologies and frameworks related to webdev [The full list of
        which is featured on my resume :)]
      </>
    ),
  },

  contact: {
    description: "get in touch",
    run: () => (
      <>
        Feel free to reach out to me,{" "}
        <Link href="mailto:joshua02k@gmail.com">joshua02k@gmail.com</Link>
      </>
    ),
  },

  projects: {
    description: "things I've built or helped contribute to",
    run: () => (
      <>
        <i>Dental Practice Management Software</i>:{" "}
        <Link href="https://github.com/joshkat/dentalcore">Code</Link>
        <br />
        <i>Training Tracker</i>:{" "}
        <Link href="https://github.com/joshkat/Training-Tracker">Code</Link> |{" "}
        <Link href="https://training-tracker-joshkats-projects.vercel.app">
          Preview
        </Link>
        <br />
        <i>Sorting Visualizer</i>:{" "}
        <Link href="https://github.com/joshkat/visualArraySort">Code</Link> |{" "}
        <Link href="https://joshkat.github.io/visualArraySort/">Preview</Link>
        <br />
        <i>Memory Card Game</i>:{" "}
        <Link href="https://github.com/joshkat/memory-card-game">Code</Link> |{" "}
        <Link href="https://poke613.vercel.app">Preview</Link>
      </>
    ),
  },

  clear: {
    description: "clear the terminal",
    run: (ctx) => ctx.clear(),
  },
  cls: {
    hidden: true,
    run: (ctx) => ctx.clear(),
  },

  // --- easter eggs -------------------------------------------------------
  yeezy: {
    hidden: true,
    run: () => (
      <>
        Yeezy, Yeezy, what&apos;s good?
        <br />
        It&apos;s your boy Max B, what&apos;s going on?
        <br />
        Just checking in on you
        <br />
        Appreciate the love and support
        <br />
        The wave is here
        <br />
        <iframe
          title="yeezy"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/track/1ZnA4VYOlYIShuGt60LmCs"
          width="65%"
          height="80"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </>
    ),
  },

  easteregg: {
    hidden: true,
    run: () => (
      <>
        Wait there&apos;s no easter egg?
        <br />
        Always has been.
        <br />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://i.imgflip.com/6hdfd7.jpg"
          alt="easter egg meme"
          height={150}
          width={300}
        />
      </>
    ),
  },

  stop: {
    hidden: true,
    run: () => (
      <>
        hammertime
        <br />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://25.media.tumblr.com/tumblr_lrn9b5m2Dx1qgwi7to1_250.gif"
          alt="stop hammertime"
          height={100}
          width={100}
        />
      </>
    ),
  },

  developers: {
    hidden: true,
    run: () => (
      <iframe
        width="280"
        height="157.5"
        src="https://www.youtube.com/embed/Vhh_GeBPOhs?controls=0&autoplay=1"
        title="developers"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    ),
  },

  boom: {
    hidden: true,
    run: (ctx) => ctx.playAudio("/boom.mp3"),
  },

  qwerty: {
    hidden: true,
    run: () => <>Did you mean qwertyuiopasdfghjklzxcvbnm?</>,
  },
  qwertyuiopasdfghjklzxcvbnm: {
    hidden: true,
    run: () => <>Did you mean qwerty?</>,
  },
};

function visibleCommandNames(registry) {
  return Object.keys(registry).filter((name) => !registry[name].hidden);
}

/**
 * Run a command by name. Returns the React node to print, or `null` for
 * commands that only cause a side effect (clear, redirect, audio...).
 * Unknown commands return a "not found" node.
 */
export function runCommand(rawInput, ctx) {
  const name = rawInput.trim().toLowerCase();
  if (!name) return { node: null, echo: false };

  const command = commands[name];
  const context = { ...ctx, commands };

  if (!command) {
    return {
      node: <span className="text-red-400">command {name} not found</span>,
      echo: true,
    };
  }

  const node = command.run(context) ?? null;
  return { node, echo: true };
}
