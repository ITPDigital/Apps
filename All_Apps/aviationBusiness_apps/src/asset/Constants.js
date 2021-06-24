import {Images} from './Images';
import {ScalePerctFullWidth} from './Scale';

export const NavigationIconMap = new Map([
  [
    'HomeTabScreen',
    {
      icon: Images.homewhite,
      activeIcon: Images.homegrey,
      size: 20,
      id: 0,
    },
  ],
  [
    'VideoTabScreen',
    {
      icon: Images.videowhite,
      activeIcon: Images.videogrey,
      size: 20,
      id: 1,
    },
  ],
  [
    'PodcastTabScreen',
    {
      icon: Images.podcastBlack,
      activeIcon: Images.podcastRed,
      size: 18,
      id: 2,
    },
  ],
  [
    'MagazineTabScreen',
    {
      icon: Images.magzinewhite, 
      activeIcon: Images.magzinegrey,
      size: 20,
      id: 3,
    },
  ],
]);

export const Constants = {
  topics: {
    minimumTopics: 3,
  },
  menuSections: {
    defaultSection: [
      {
        name: 'Home',
        tid: '0',
        id: '0',
        field_image: '',
        type: 'topic',
      },
    ],
  },
  articleListSections: {
    topStories: 'Top Stories 12',
    editorial: 'Editorial Highlights',
    empty: '',
    podcast: '  Latest podcast',
    videos: 'Latest videos',
    WorthFollowing: 'Worth Following',
  },
  errorMessages: {
    checkNetwork: 'Network Error',
    network: 'Please check your internet connection and try again',
    general: 'Some error occured, Please try again later',
  },
  emptyMessages: {
    noRecord: 'No articles found',
  },
  myTrove: {
    first: 8,
    second: 10,
    third: 15,
  },
  myTroveTablet: {
    first: 5,
    second: 9,
  },
  drawerTopData: [
    {routeName: 'HistoryDrawerScreen', title: 'History'},
    {routeName: 'BookmarkDrawerScreen', title: 'Bookmarks'},
  ],
  drawerBottomData: [
    {routeName: 'SettingsDrawerScreen', title: 'Settings'},
    {routeName: 'HelpDrawerScreen', title: 'Help'},
    {routeName: 'TosDrawerScreen', title: 'Terms of service'},
  ],
  drawerHistoryData: {routeName: 'HistoryDrawerScreen', title: 'History'},
  drawerBookmarkData: {routeName: 'BookmarkDrawerScreen', title: 'Bookmarks'},
  drawerSettingsData: {routeName: 'SettingsDrawerScreen', title: 'Settings'},
  drawerHelpData: {routeName: 'HelpDrawerScreen', title: 'Help'},
  drawerTosData: {routeName: 'TosDrawerScreen', title: 'Terms of service'},

  drawerMiddleData: {routeName: 'ProfileDrawerScreen', title: 'Profile'},
  drawerLogoutData: {routeName: 'Logout', title: 'Log Out'},
  articleDisplay: {
    blackCircle: '\u2022',
  },
};

export const TemplateConfig = {
  articleTemplates: {
    1: ['bigImage',  'title', 'footer', 'seperator'],
    2: ['title', 'footer'],
    3: ['bigImage',  'title', 'footer', 'seperator'],
    4: ['bigImage',  'title', 'description', 'footer', 'seperator'],
    5: ['bigImage',  'title', 'description', 'footer', 'seperator'],
    6: ['title', 'description', 'footer'],
    7: ['title', 'description', 'footer'],
    8: ['title', 'footer'],
    9: ['bigImage', 'title', 'description', 'footer', 'seperator'],
    10: ['bigImage','title', 'description', 'footer', 'seperator'],
    11: ['bigImage',  'title', 'description', 'footer', 'seperator'],
    12: ['seperator', 'title', 'description', 'footer', 'seperator'],
    13: ['bigImage',  'title', 'footer', 'seperator'],
    14: ['seperator', 'title', 'description', 'footer'],
    15: ['title', 'description', 'footer'],
    16: ['imgWithoutTitle', 'onlyTitle', 'footer', 'seperator'],
    17: ['mostReadTitle'],
    18: [ 'title', 'description', 'footer'],
    19: ['title', 'footer', 'seperator'],

  },
  galleryTemplate: {
    1: ['galleryOne', 'title', 'description', 'footer', 'seperator'],
    2: ['galleryTwo', 'title', 'description', 'footer', 'seperator'],
  },
  galleryTemplateSettings: {
    1: {
      isTitleImage: false,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(58),
      isFooterLine: true,
    },
    2: {
      isTitleImage: false,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(58),
      isFooterLine: true,
    },
  },
  articleTemplateSettings: {
    1: {
      isNoTopMargin: true,
      isTitleImage: false,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(68),
      isFooterLine: true,
      isLessPadding: true,
    },
    2: {
      isTitleImage: true,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(68),
      isFooterLine: true,
    },
    3: {
      isTitleImage: false,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(68),
      isFooterLine: true,
    },
    4: {
      isTitleImage: false,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(110),
      isFooterLine: true,
    },
    5: {
      isTitleImage: false,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(58),
      isFooterLine: true,
    },
    6: {
      isTitleImage: true,
      // isFollow: true,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(68),
      isFooterLine: true,
    },
    7: {
      isTitleImage: true,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(68),
      isFooterLine: true,
    },
    8: {
      isTitleImage: false,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(68),
      isFooterLine: true,
    },
    9: {
      isTitleImage: false,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(90),
      isFooterLine: true,
    },
    10: {
      isTitleImage: false,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(68),
      isFooterLine: true,
    },
    11: {
      isTitleImage: false,
      // isFollow: true,
      isFollow: false,

      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(68),
      isFooterLine: true,
    },
    12: {
      isTitleImage: true,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(68),
      isFooterLine: false,
    },
    13: {
      isTitleImage: false,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(68),
      isVideo: true,
      isFooterLine: true,
    },
    14: {
      isTitleImage: true,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(68),
      isFooterLine: true,
      //width: ScalePerctFullWidth(50),
    },
    15: {
      isTitleImage: false,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(68),
      isVideo: false,
      isFooterLine: false,
    },
    16: {
      isTitleImage: true,
      isFollow: false,
      isPadded: false,
      isCenter: false,
      height: ScalePerctFullWidth(68),
      isFooterLine: false,
    }
  },
  articleDisplayTemplates: {
    1: ['image', 'title', 'description'],
    2: ['image', 'title', 'description'],
    3: ['title', 'lead_text', 'image', 'description'],
  },
  articleDisplayTemplateSettings: {
    1: {
      // isNoTopMargin: true,
      // isTitleImage: false,
      // isFollow: false,
      // isPadded: false,
      isCenter: false,
    },
    2: {
      // isTitleImage: true,
      // isFollow: false,
      // isPadded: false,
      isCenter: false,
    },
    3: {
      // isTitleImage: false,
      // isFollow: false,
      // isPadded: false,
      isCenter: false,
    },
  },
};
