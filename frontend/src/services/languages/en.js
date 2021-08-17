export const English = {
	translation: {
      Error: {
        unexpected: 'An Unexpected Error Occurred :(',
        unexpectedresponse: 'There was an unexpected response from the server',
        sendemail: 'There was an error sending the email'
      },
      Navbar: {
        change_language: 'Change Language',
        dashboard: 'Dashboard',
        about_project: 'About Project',
        plans_project: 'Project Plans',
        register: 'Register',
        login: 'Login',
        logout: 'Logout',
        edit_account: 'Edit Account',
        change_password: 'Change Password',
        account: 'Account'
      },
      Footer: {
        github: 'Link to project on GitHub'
      },
      Home: {
      	title: 'Home Page',
        create_account: 'Create an Account',
        create_account_text: 'Test our user creation and authentication system. If you wish, we can also confirm your email so that you receive Administrator permissions on our system!',
        create_account_link: 'Register',
        about_project: 'About Project',
        about_project_text: 'Learn a little about the technologies used in the project. Understand what the acronym MERN means, how the Heroku platform works and all the libraries used in the project.',
        about_project_link: 'Access',
        plans_project: 'Project Plans',
        plans_project_text: 'See what the plans are for the project, from those that are underway to those that have already been completed.',
        plans_project_link: 'Access'
      },
      SendEmailToken: {
      	message_text: 'Confirm your email to receive access to Admin functionalities',
      	button_text: 'Send Email'
      },
      AboutProject: {
      	title: 'About the project',

      	accordion1_title: 'What is MERN',
      	accordion1_text1: 'MERN is one of several variations of the MEAN stack (MongoDB, Express, Angular, Node), where the traditional Angular.js front-end structure is replaced by React.js. Other variants include MEVN (MongoDB, Express, Vue, Node) and really any JavaScript front-end framework can work.',
      	accordion1_text2: 'Express and Node make up the middle (application) tier. Express.js is a server-side web framework, and Node.js the popular and powerful JavaScript server platform. Regardless of which variant you choose, ME(RVA)N is the ideal approach to working with JavaScript and JSON, all the way through.',
      	accordion1_text3: 'The MERN architecture allows you to easily construct a 3-tier architecture (frontend, backend, database) entirely using JavaScript and JSON.',
      	accordion1_linktext1: 'Original text:',
      	accordion1_link: 'MongoDB Official Website',
      	
        accordion2_title: 'What is Heroku',
        accordion2_text1: 'Heroku is a container-based cloud Platform as a Service (PaaS). Developers use Heroku to deploy, manage, and scale modern apps. Our platform is elegant, flexible, and easy to use, offering developers the simplest path to getting their apps to market.',
        accordion2_text2: 'Heroku lets you deploy, run and manage applications written in Ruby, Node.js, Java, Python, Clojure, Scala, Go and PHP. Heroku lets you deploy, run and manage applications written in Ruby, Node.js, Java, Python, Clojure, Scala, Go and PHP.',
        accordion2_text3: 'The Heroku platform uses Git as the primary means for deploying applications (there are other ways to transport your source code to Heroku, including via an API).',
        accordion2_text4: 'When the Heroku platform receives the application source, it initiates a build of the source application. The build mechanism is typically language specific, but follows the same pattern, typically retrieving the specified dependencies, and creating any necessary assets (whether as simple as processing style sheets or as complex as compiling code).',
        accordion2_text5: 'Heroku executes applications by running a command you specified in the Procfile, on a dyno that’s been preloaded with your prepared slug (in fact, with your release, which extends your slug and a few items not yet defined: config vars and add-ons).',
        accordion2_text6: 'Generally, if you deploy an application for the first time, Heroku will run 1 web dyno automatically. In other words, it will boot a dyno, load it with your slug, and execute the command you’ve associated with the web process type in your Procfile.',
        accordion2_text7: 'Heroku runs your app in lightweight, isolated Linux containers called "dynos." The platform offers different dyno types to help you get the best results for your type of app.',
        accordion2_text8: 'In this project I use the free dyno, which allows me to have 512 MB of RAM available and after 30 minutes of inactivity it goes into sleep mode, otherwise it keeps active for a free monthly period of time.',
        accordion2_linktext1: 'Original text:',
        accordion2_linktext2: 'For More Details on Offered Prices:',
        accordion2_link1: 'Heroku Official Website',

        accordion3_title: 'Packages/Used Libraries',
        accordion3_subtitle1: 'Front-end',
        accordion3_subtitle2: 'Back-end',
        accordion3_npmjspage: 'Npmjs.com Page',
        accordion3_documentation: 'Documentation',
        accordion3_githubpage: 'GitHub Page',
        accordion3_officialpage: 'Official page',
      },
      ConfirmEmail: {
      	title: 'Confirm Email'
      },
      Dashboard: {
      	title: 'Dashboard',
      	menu_title: 'Menu',
      	menu_item1: 'List Users',
        tableedit: 'Edit',
        tableremove: 'Remove'
      },
      EditAccount: {
      	title: 'Edit Account',
      	form_label1: 'Name:',
      	form_label2: 'Email:',
      	form_submit: 'Update',
        emailedit_text: 'When changing your email you will need to confirm the email again. Are you sure you want to change your email?',
        emailedit_accept: 'Yes',
        emailedit_reject: 'No'
      },
      EditPassword: {
      	title: 'Change Password',
      	form_label1: 'Current Password:',
      	form_label2: 'New Password:',
      	form_label3: 'Confirm New Password:',
      	form_submit: 'Update'
      },
      EditUser: {
      	title: 'Edit User',
      	form_label1: 'Name:',
      	form_label2: 'Email:',
      	form_submit: 'Edit'
      },
      NotFound: {
      	title: 'Page not found :('
      },
      PlansProject: {
      	title: 'Project Plans',
      	plan1: 'User Authentication System',
      	plan2: 'User Permission System',
      	plan3: 'Email Submission and Email Confirmation',
      	plan4: 'Creating Own Style',
      	plan5: 'Website Translation to English',
        plan6: 'Responsive style for mobile device'
      },
      SignIn: {
      	title: 'Login',
      	form_label1: 'Email:',
      	form_label2: 'Password:',
      	form_submit: 'Login',
        form_empty: 'Fill in all data to login'
      },
      SignUp: {
      	title: 'Create an account',
      	form_label1: 'Name:',
      	form_label2: 'Email:',
      	form_label3: 'Password:',
      	form_submit: 'Register',
        form_empty: 'Fill in all data to register'
      },
      Unauthorized: {
      	title: 'You do not have permission to access'
      },
      Validations: {
        User: {
          username_required: 'Name is empty',
          username_min: 'Name has less than 3 characters',
          username_max: 'Name has more than 35 characters',
          email_required: 'Email is empty',
          email_invalid: 'Invalid email',
          password_required: 'Password is empty',
          password_min: 'Password has less than 8 characters',
          password_max: 'Password has more than 40 characters',
          passwords_notmatch: 'Passwords do not match'
        }
      }
    }
}