# Solent Collaboration App

## Introduction
Collaboration is an important process which allows for an individual to improve not just their industrial skills but their soft skills as well [ref](https://www.nutcache.com/blog/the-importance-of-collaboration-in-the-workplace/). Soft skills can be important in a workplace allowing more efficient and effective flow within a team. Important soft skills considered can be communication where an individual would express a problem found within a task, they undertake by distinctively express what the issue might be and how they encountered the issue [ref](http://sun.library.msstate.edu/ETD-db/theses/available/etd-11022009-172940/).

Business nowadays would prefer employees with strong soft skill to ensure the maximum potential is met [ref](https://www.freshgigs.ca/blog/why-employers-value-soft-skills-more-than-ever-before/). Evidently, graduates and students would benefit from obtaining such skills especially before completing their undertaken degree.

The project Solent Collaboration App was devised to meet those requirements. In previous research [ref](https://1drv.ms/b/s!AsSXoJ2dND6plXz1-XptfwzKOEKd) it was outlined that universities provide some collaboration related teaching however they can benefit from additional projects they can use to display on potential interviews where they can showcase not just their individual abilities but the ability to work within a team. The application was focused on connecting users together and providing the means of organising project information and carrying out the task.

The success of the application however will solely depend on the end users therefore a testing and evaluation stage is required to outline potential problems and future opportunities. However, before a user evaluation is carried out the application must ensure certain benchmarks are met to ensure the ease of use.

The documentation will focus on testing the application ensuring it is ready for commercial use before usability testing is carried out. Therefore, a tools called Lighthouse and GTmetrix will be used to test the general performance and the usability of the application which will be compared to benchmarks that are defined.

## Project Presentation
User journey the project idea was drafted from based upon:
![FirstStage](/reportImages/user-journey.png)

[Link to prototype created based on the user journey](https://www.figma.com/proto/mJNFNqueZSTEEIUyVqnpCe/Solent-App?node-id=1%3A10&scaling=min-zoom)

The creation of the app was solely based on collaboration and ensuring the right individuals are enrolled into the right project therefore admin right was granted to the creator of the project where him/her will act as a manager and select the candidates they believe will be most suitable for that project which again provides more development for one's skill. The application also focused on providing certain features to ensure users can communicate during the development of the project. One such features was the live chat.

On the other hand, the application contains limited features and it was aimed to only showcase project without providing any time management features or document storage. Following, the purpose of this was to ensure the students will explore different tools and research different techniques for managing their projects and time to ensure a student will apply the research abilities obtain from university and use them effectively to achieve a common goal.

The platform could be perceived as a live briefing application which will allow a user to create a brief others can follow or question combining the live chat to ensure all questions regarding the brief are met, issues regarding the projects are mentioned and technologies or tools that will be used to develop or track the project to be discussed.

In terms of UX and UI design the focus was on creation of a task cantered design where a user will find projects easily, keep a collection of the projects they have created or the projects they have joined and a simple search that either displays the roles most suitable for the search or the user can look at all projects created. However, the user will be limited to one role defined upon registration to ensure the maximum simplicity of the application.

The navigation contains simple four buttons which will guide the user to quick actions that they will require such as viewing and editing their profile or viewing their projects. The reason behind this was to create a very simple and clear navigation that any student can use no matter the degree they undertook.

Simple feature to view one’s profile was also established to allow users to gain more detail about their peers within that project. However, you can only see users’ part of a project without allowing the ability for searching users and messaging users privately to ensure minimum data is being exposed. Furthermore, images were not allowed to be uploaded for the same reason.

## Technology and Justification
React JS - It is a component based Javascript framework for building user interfaces [ref](https://reactjs.org). The library is very simple and lightweight framework that deals only with the view layer of an application [ref](https://stories.jotform.com/7-reasons-why-you-should-use-react-ad420c634247). React also provides reusable components  which can increase the development time of an application as well as provide a more consistent look and easier to maintain codebase [ref](https://stories.jotform.com/7-reasons-why-you-should-use-react-ad420c634247) which is why the framework was used for the project. React will be used in a functional version due to the increased simplicity of defining a function instead of a class and without the need to manage this enabling a more clean and quicker solution [ref](https://tylermcginnis.com/why-react-hooks/).

Sass - Is a feature rich CSS pre-processor which allows for SCSS files to split in different sections/folders allowing better organization and easy to debug structure [ref](https://www.mugo.ca/Blog/7-benefits-of-using-SASS-over-conventional-CSS). In the end the multiple scss files can be compiled into a single file [ref](https://alistapart.com/article/why-sass/). SASS also provides numerous of features such as mixins, nesting and variables which allows for a better management and combination of classes allowing clear vision of the purpose of certain styles.

Firebase - Is a serverless solution to a database approach allowing the management of data in real time plus removing the need of management of the server side of the development process providing a easy and efficient solution [ref](https://medium.com/firebase-developers/what-is-firebase-the-complete-story-abridged-bcc730c5f2c0).

React Hook Forms - Provides a flexible and easy to use form validation with many features such as the ability to pass form error and hooks acting like use effect to monitor changes on the form allowing action to be carried out upon that change [ref](https://react-hook-form.com).

Yup - Combined with React hook forms it extends the validation capabilities for a form. It is a schema builder for value parsing and validation and it works by defining a form schema and validate an existing value based on that schema [ref](https://github.com/jquense/yup).

React Router - It allows for a single page application to be build without the need of page refresh upon navigation which provides a more seamless experience [ref](https://medium.com/@marcellamaki/a-brief-overview-of-react-router-and-client-side-routing-70eb420e8cde).

## Methodology

### Development Management
Following, the prototype created based on previous research which allowed the project to be seperated into small tasks to leave gap for a methodology to be utilised. To achieve that the theory of first principles was used where you are required to dig deeper into a problem until the only thing its left is actions that you know are truths or in this case needed [ref](https://jamesclear.com/first-principles).

To adopt the theory in this project every page was broken down to things it must needs to build one.

Example - User requires an account:
* User will need to log in
    * Log In page is needed
        * Form is required
            * Form requires styling
                * CSS is required
                    * SASS to style all form elements
            * It requires validation
                * React Hooks forms can be used
                    * Yup should be used to extends the validation
        * User data will need to be stored
            * A table of users in the database is needed
                * User will need to be matched against the record
                    * Firebase Provides a function to achieve this
                        * onAuthStateChanged() function is used
                            * If user is correct set state to true

Different tasks were group by page level which allowed for methodology framework to be utilised which was Kanban. The Kanban methodology improves flow of workload because one task is not dependant on other. The framework is used for quick deployment and It functions by placing the tasks into columns based on the task progress which provides better visual representation of the current project progress [ref](https://www.agilealliance.org/glossary/kanban/#q=~(infinite~false~filters~(postType~(~'page~'post~'aa_book~'aa_event_session~'aa_experience_report~'aa_glossary~'aa_research_paper~'aa_video)~tags~(~'kanban)).~searchTerm~'~sort~false~sortDirection~'asc~page~1)). Kanban methodology utilised by developers because of its advantage of visibility of the overall project allowing for better tracking of progress and management of the overall application [ref](https://www.sitepoint.com/how-why-to-use-the-kanban-methodology-for-software-development/).

To apply Kanban GitHub projects were used and here is evidence of development during different stages:

Begining Stage:
![FirstStage](/reportImages/firstImage.png)
Mid Stage 1
![SecondStage](/reportImages/secondImage.png)
Mid Stage 2
![ThirdStage](/reportImages/thirdImage.png)
Final Stage
![FinalStage](/reportImages/finalImage.png)

### Testing Methodology
To ensure the project is ready to be released for a usability testing it first needs to ensure it meets criterias such as Performance and Accessibility. The metrics are required because they affect the user's decision towards the application if the application is frustrating to use therefore it will take the focus out of testing if the application is easy to use instead users will focus on the application is loading slowly [ref](https://stackify.com/slow-app-performance-bottom-line/).

To test the application a tool called Google lighthouse will be used which tests four metrics which are Performance, Accessibility, Best Practices and SEO. To ensure an efficient enough experience a benchmark of Orange will be required for each metric with several more than 70. To further solidify the results another test will be ran using GTmetrix which will look at the overall performance of the service providing a backup. The benchmark for the GTmetrix report will be a Page Speed of A with a loading time of less than 3.7 seconds which is average loading time according to GTmexrix [ref](https://gtmetrix.com/reports/solent-app.web.app/Uxz5btfd).

The testing question will therefore be: Will the application pass the testing benchmark set using the tools Google Lighthouse and GTmetrix?

As part of the results areas of improvements will be listed to aid in future improvements of the application.

## Results
The application will be tested for Mobile and Desktop because it is aimed to be used on any device.

### Mobile Results:
General Overview:
![Mobile Overview](/reportImages/MobileOverview.PNG)

Performance Improvements:
![Performance Improvements](/reportImages/Performance.PNG)

Accessibility Improvements:
![Accessibility Improvements](/reportImages/Performance.PNG)

### Desktop Results:
General Overview:
![General Overview](/reportImages/DektOverview.PNG)

### GTmextrix Report:
![General Overview](/reportImages/GTMextix.PNG)

## Discussion
As it can be seen from the results above the Mobile and Desktop metrics are passing the suggested benchmarks for the Lighthouse test. The Accessibility has the worst score with 73 on Desktop and Mobile. The performance however varies on both with the Mobile performing better obtaining a score of 77 whereas the Desktop test produced a score of 71. In both the SEO and the Best Practices are fully met with both scoring 100 on both audits.

In terms of Accessibility some issues are related to the forms and the lack of labels associating with the form elements which can be a simple fix to boost the score in that section. Another issue is that the colours on the page do not have sufficient contrast ratio which could affect visually impaired people however this fix cannot be applied due to the colour scheme being a replica of the Solent University colours.

From the GTmetrix report the application matches the criteria as well. Page Speed is A with 95% score and the page takes 444ms to load compare to the initial target. It can also be seen that the page size is only 367Kb compare to the average of 2.97Mbs. From the test the page speed is meeting all the benchmarks set out initially.

## Evaluation
Despite the success in the testing stage there are still improvements to be made to increase the Usability and Performance scores according to the Lighthouse Report which could be a future implementation. Another possible improvement can be the ability for a user to remove themselves from a project instead of granting the ability only to the admin. A feature could be implemented where the user must require to be released from the project giving the admin a notice period to simulate real employment scenarios. Another potential improvement can be the ability for a user to remove themselves from the platform which was a feature originally drafted however due to a time limitation the feature was not implemented. The outcome could be achieve using cloud functions provided by firebase to delete a user plus their involvement in projects however that would have had a massive impact on a project if a user left therefore more user research will be required to solve the issue.

The technologies used to develop the application proved to be very efficient creating a very organised environment. Using react helped significantly in terms of code reusability allowing for major parts of the application to be recycled such as the Header section or the dividers. Using react hook forms along with yup allowed for a very advance validation such as a validation for a strong password.

The prototype was completed however during the development stage it was found that certain parts had to be created or eliminated to improve not the just the look and feel of the product but its usability as well. One such example is addition of the “Awaiting for Approval” message once the user has joined or moving the join button to inside of the project page to allow a user to first review the project brief before blindly joining as drafted in the brief. To improve the look of the application a new card design was created to display the projects within a search or my projects which featured a custom vector image with content keeping the same structure as before. The changes cannot be considered successful due to the inability to a usability testing however I do believe it is the best course of action.

## Conclusion
In conclusion the application was created based on the research data acquired from previous research gathered and each individual task within the application was carefully thought through which in the end presented a very fast performing application with a strong usability ready to be released to the world based on the feedback received from the testing stage.
