angular.module('orthoApp')
  .service('mainService', function() {

    this.sociallinks = [
    {
      name: 'facebook',
      id: 'fb',
      path: './assets/img/icons/facebook.png',
      alt: 'facebook link'
    },
    {
      name: 'instagram',
      id: 'ig',
      path: './assets/img/icons/instagram.png',
      alt: 'instagram link'
    },
    {
      name: 'twitter',
      id: 'tt',
      path: './assets/img/icons/twitter.png',
      alt: 'twitter link'
    },
    {
      name: 'googleplus',
      id: 'gp',
      path: './assets/img/icons/googleplus.png',
      alt: 'google plus link'
    },
    {
      name: 'linkedin',
      id: 'li',
      path: './assets/img/icons/linkedin.png',
      alt: 'linked in link'
    }];

    this.homesectionlinks = [{
      title: 'New Patients',
      route: 'patientinformation.introduction'
    },
    {
      title: 'Patient Registration',
      route: 'patientinformation.patientregistration'
    }
    ];
    this.patientinfosectionlinks = [
      {
        title: 'Introduction',
        route: 'patientinformation.introduction'
      },
      {
        title: 'Why Choose Our Practice',
        route: 'patientinformation.whychooseourpractice'
      },
      {
        title: 'Patient Registration',
        route: 'patientinformation.patientregistration'
      },
      {
        title: 'Payment and Insurance',
        route: 'patientinformation.paymentandinsurance'
      }
    ];
    this.aboutorthosectionlinks = [
      {
        title: 'Orthodontic Treatment',
        route: 'aboutorthodontics.orthodontictreatment'
      },
      {
        title: 'Children and Braces',
        route: 'aboutorthodontics.childrenandbraces'
      },
      {
        title: 'Adults and Braces',
        route: 'aboutorthodontics.adultsandbraces'
      }
    ];
    this.servicessectionlinks = [
      {
        title: 'Traditional Braces',
        route: 'services.braces'
      },
      {
        title: 'Clear Braces',
        route: 'services.clearbraces'
      },
      {
        title: 'Invisalign',
        route: 'services.invisalign'
      }
    ];


  });
