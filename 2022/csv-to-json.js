import fs from 'fs';
import { parse } from 'csv-parse';

const options = {
  delimiter: ',',
  escape: '"',
  columns: true,
};

const raw = fs.readFileSync('2022/results-raw.csv', { encoding: 'utf8' });

const columns = {
  'Timestamp': {
    header: 'Timestamp',
    postProcess: x => (new Date(x)).toISOString(),
  },
  'Have/will you get at least one ⭐ in Advent of Code 2022?': {
    header: 'Participates_in_2022',
    answers: {
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
      'Yes, (mostly) in december 2022': 'Dec',
      'Yes, (mostly) after 2022': 'Later',
    }
  },
  'Did you participate in 2015? (first edition, "star-powered machine" theme)': {
    header: 'Participates_in_2015',
    answers: {
      'Yes, (mostly) in december 2015': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2016? ("Easter Bunny HQ" theme)': {
    header: 'Participates_in_2016',
    answers: {
      'Yes, (mostly) in december 2016': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2017? ("naughty or nice list" theme)': {
    header: 'Participates_in_2017',
    answers: {
      'Yes, (mostly) in december 2017': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2018? ("time travel" theme)': {
    header: 'Participates_in_2018',
    answers: {
      'Yes, (mostly) in december 2018': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2019? ("spacecraft" theme)': {
    header: 'Participates_in_2019',
    answers: {
      'Yes, (mostly) in december 2019': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2020? ("tropical island vacation" theme)': {
    header: 'Participates_in_2020',
    answers: {
      'Yes, (mostly) in december 2020': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2021? ("ocean" theme)': {
    header: 'Participates_in_2021',
    answers: {
      'Yes, (mostly) in december 2021': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Primary language(s) for AoC 2022?': {
    header: 'Languages',
     multi: true,
     answers: {
      "awk": "AWK",
      "Awk": "AWK",
      "brainfuck": "Brainfuck",
      "Clojure": "Clojure/ClojureScript",
      "common lisp": "Common Lisp",
      "dart": "Dart",
      "Dart!": "Dart",
      "Frink ( https://frinklang.org/ )": "Frink",
      "Gamemaker Language": "GameMaker",
      "GameMaker Language": "GameMaker",
      "google spreadsheet": "Google Sheets",
      "Janet (janet-lang-org)": "Janet",
      "Idris2": "Idris",
      "JQ": "jq",
      "minecraft commands": "Minecraft",
      "nim": "Nim",
      "N/A": "n/a",
      "ocaml": "OCaml",
      "Ocaml": "OCaml",
      "OCamL": "OCaml",
      "Perl": "Perl 5", // The years where this was asked on the survey it clearly meant Perl 5
      "Perl 6": "Raku",
      "Perl 6 / Raku": "Raku",
      "pony": "Pony",
      "Ponylang": "Pony",
      "scheme": "Scheme",
      "SCHEME": "Scheme",
      'Some kind of SCHEME dialect': 'SCHEME dialect',
      'Some kind of SCHEME dialect, probably racket': 'Scheme dialect',
      'Squeam (a Lisp dialect I made up)': 'Squeam (own Lisp dialect)',
      'Racket/Scheme': 'Scheme/Racket', // So that they sort together
      'probably racket': 'Racket',
      'tcl': 'Tcl',
      'Tcl for each + a different language each day': 'Tcl',
      'TCL should come in the list': 'Tcl;Each day a different language',
      "q": "Q",
      "Unreal Engine 4 (Blueprints)": "Unreal Engine 4",
      'Wolfram Language / Mathematica': 'Wolfram;Mathematica',
      'WolfLang': 'Wolfram',
      "zig": "Zig",
     },
     preProcess: answer => {
       return answer.replace(',', ';').replace(' and ', ';');
     },
     postProcess: answer => {
       if (!answer) return '';
       if (answer.length > 40) return answer.substring(0, 32) + '...';
       return answer;
     }
  },
  'Primary IDE(s) for AoC 2022?': {
    header: 'IDEs',
    multi: true,
    answers: {
      'CodeBlocks': 'Code::Blocks',
      'Codeblocks': 'Code::Blocks',
      'Code Blocks': 'Code::Blocks',
      'code::blocks': 'Code::Blocks',
      'geany': 'Geany',
      'gedit + console': 'Gedit',
      'gedit': 'Gedit',
      "google colabs": "Google Colab",
      "Colab": "Google Colab",
      "Google colab": "Google Colab",
      'Jetbrains Rider': 'Rider',
      'JetBrains Rider': 'Rider',
      'Jupyter Notebook': 'IPython / Jupyter',
      'Jupyter': 'IPython / Jupyter',
      "nano": "Nano",
      'Python IDLE': 'IDLE',
      'python IDLE': 'IDLE',
      'python idle': 'IDLE',
      'Idle': 'IDLE',
      'idle': 'IDLE',
      'iDLE': 'IDLE',
      'Linqpad': 'LINQPad',
      'LinqPad': 'LINQPad',
      'LinqPAD': 'LINQPad',
      'MATLAB': 'Matlab',
      'matlab': 'Matlab',
      'matlab?': 'Matlab',
      "neovim": "Neovim",
      "NeoVim": "Neovim",
      "Replit": "Repl.it",
      "repl.it": "Repl.it",
      "Vscode neovim": "Neovim",
      'vim and a shell': 'Vim',
      'Visual Studio Code': 'VS Code',
      "webstorm": "WebStorm",
      "Webstorm": "WebStorm",
      "Mathematica Notebook": "Mathematica",
      "Wolfram Mathematica": "Mathematica",
      "Wolfram Notebook": "Mathematica",
      'Wolfram Notebook / Mathematica Notebook': 'Wolfram Notebook;Mathematica Notebook',
    },
    preProcess: answer => {
      return answer.replace(',', ';');
    },
    postProcess: answer => {
      if (!answer) return '';
      if (answer.length > 40) return answer.substring(0, 32) + '...';
      return answer;
    }
  },
  'Primary OS for AoC 2022?': {
    header: 'OS',
    answers: {
      'Chrome OS': 'ChromeOS',
      'Running a linux command line VM in windows...  Mark that how you want.': 'Linux', // Well don't mind if I do!
      'windows for development, commodore 64 (emulator) for running the programs': 'Windows', // So sorry for stripping this cool answer (just to make the data viz look okay)! Will promise next year to include "Cool remarks about your setup?" question for this shizzl...
      'Windows / Linux 50/50': 'Combi of Windows/Linux',
      'Windows+Linux': 'Combi of Windows/Linux',

      // A bunch of WSL variants:
      'Windows + Linux Subsystem': 'WSL',
      'WSL ubuntu': 'WSL',
      'Windows Subsystem for Linux': 'WSL',
      'Windows with WSL': 'WSL',
      'WSL2': 'WSL',
      'WSL in windows': 'WSL',
      'WSL on Windows. So both lol': 'WSL',
      'WSL-Ubuntu': 'WSL',
      'WSL on Windows (Windows/Linux combo)': 'WSL',
      'Windows with WSL2': 'WSL',
      'WSL (ubuntu)': 'WSL',
      'Ubuntu WSL2 on Windows 11': 'WSL',
      'WSL in Windows': 'WSL',
      'Windows Subsystem for Linux (w/ Ubuntu 20.04)': 'WSL',
      'Windows 10 using WSL to run programs': 'WSL',
      'Ubuntu in WSL2 on windows': 'WSL',
      'WSL 2': 'WSL',
      'Windows + WSL2': 'WSL',
      'Windows + WSL': 'WSL',
      'Windows Subsystem for Linux + Debian': 'WSL',
      'Windows/WSL2': 'WSL',
      'WSL2 on Windows10': 'WSL',
      'WSL2 Ubuntu, so both Windows and Linux? idk': 'WSL',
      'WSL2': 'WSL',
      'WSL2 (I\'m not sure whether it counts as Windows or Linux)': 'WSL',
      'Using WSL (so Windows). Ideally Linux.': 'WSL',
      'Windows Subsystem for Linux (Ubuntu 20)': 'WSL',
      'Windows + Ubuntu via WSL': 'WSL',
      'Windows running Linux through the WSL? So, is that both? If not, put me down for Windows.': 'WSL',

      'macOS and Windows': 'Combi of Windows/macOS',
      'Windows and MacOS': 'Combi of Windows/macOS',
      'ios': 'iOS',
      'Linux or Chrome OS': 'Combi of Linux/ChromeOS',
      '': '(Blank)',
    },
  },
  'Do you go for the *global* leaderboard?': {
    header: 'Global_Leaderboard_Participation',
    answers: {
      'Yes, and I have a shot some/most days': 'Yes, I will likely get points',
      'Yes, and I might get on once or maybe twice': 'Yes, I might get points',
      'Yes, but probably won\'t make it any day': 'Yes, but no points expected',
      'No, my timezone makes that problematic': 'No, timezone is problematic',
      'No, too stressful': 'No, too stressful',
      'No, not interested': 'No, not interested',
      'Prefer not to say': 'Prefer not to say',
      '': '',
    },
  },
  'How many *private* leaderboards are you active in?': {
    header: 'Private_Leaderboard_Count',
    answers: {
      '5 or more': '5+',
    },
  },
  'I participate in AoC...': {
    header: 'Reason_for_participating',
    multi: true,
    answers: {
      'for the fun': 'for fun',
      'for the challenge': 'for a challenge',
      'to make or top the leaderboards': 'for leaderboards',
      'to learn to code': 'learn to code',
      'to learn an additional language': 'learn new language',
      'to improve my skills': 'improve skills',
      'to add to my resumé': 'add to resumé',
      'because I\'m forced to participate': 'forced to participate',
      '(prefer not to say)': 'prefer not to say',
    },
    preProcess: answer => {
      if (/\S+@\w+\.\w+/.test(answer)) return "<anonymized>"; // answers with e-mail addresses I'd rather anonimize
      return answer;
    },
  },
};

function callback(err, records) {
  let id = 100001;
  const result = records.map(record => {
    var item = { Id: id++ };
    Object.getOwnPropertyNames(record)
      .forEach(prop => {
        const info = columns[prop];
        const newProp = typeof info === 'string' ? columns[prop] : columns[prop].header;
        const preProcess = info.preProcess || (a => a);
        const postProcess = info.postProcess || (a => a);

        item[newProp] = info.hasOwnProperty('answers') ? info.answers[record[prop]] || record[prop] : record[prop];

        item[newProp] = preProcess(item[newProp]);

        if (info.multi) {
          item[newProp] = item[newProp]
            .split(';')
            .map(x => x.trim())
            .map(x => info.hasOwnProperty('answers') ? info.answers[x] || x : x)
            .map(x => x.trim())
            .map(x => postProcess(x))
            .filter(x => !!x && x.length > 0);
        } else {
          item[newProp] = postProcess(item[newProp].trim());
        }
      });
    return item;
  });

  // console.log(result);

  fs.writeFileSync('2022/results-sanitzed.json', JSON.stringify(result, null, 2), { encoding: 'utf8' });
}

parse(raw, options, callback);
