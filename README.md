# Web Platform for Integrating Gym Equipment Sales and Online Member Interaction

## Abstract

The main goal of this thesis is to develop a web application to help motivate and support
users to stay consistent throughout their fitness journey and adopt a healthy lifestyle, despite various challenges they may face. These challenges include the high cost of gym
equipment and clothing, limited social interaction within the gyms, and difficulty finding suitable workout partners and buddies. To address these issues, we implemented a
system that simplifies purchasing second-hand equipment and clothing, so users can find
quality items within their budget. The system also includes a social component that provides easy communication and connection among users, enabling them to find their ideal
workout partners, make friends, and establish a supportive community within their fitness journey. The system is implemented as a web application using the .NET Web API
framework as a server-side technology, Angular as a client-side framework, and PostgreSQL as a database provider. Real-time messaging functionalities are implemented
using SignalR, ensuring instant communication. The system integrates Stripe as a payment service, which allows users to have a trusted and reliable platform that takes care of
the security of their financial transactions. Additionally, Redis serves as a cache database
for efficient storage and retrieval of frequently accessed data, including users’ baskets
and basket items.

# Table of Contents
1. [Introduction](#1-introduction)
2. [Related Work](#2-related-work)
   1. [Tinder](#21-tinder)
   2. [MyProtein](#22-myprotein)
   3. [Polleo Sport](#23-polleo-sport)
   4. [Conclusion](#24-conclusion)
3. [Definition of the Problem](#3-definition-of-the-problem)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Feasibility Study](#6-feasibility-study)
7. [System Architecture](#7-system-architecture)
   1. [Entities and Their Relationships](#71-entities-and-their-relationships)
   2. [Database Design](#72-database-design)
   3. [Object-Oriented Approach](#73-object-oriented-approach)
   4. [Use Cases](#74-use-cases)
      - [The Use Case diagram for social interaction](#741-the-use-case-diagram-for-social-interaction)
      - [The Sequence diagram for writing a message](#742-the-sequence-diagram-for-writing-a-message)
      - [The Use Case diagram for purchasing an item](#743-the-use-case-diagram-for-purchasing-an-item)
      - [The Sequence diagram for purchasing an item](#744-the-sequence-diagram-for-purchasing-an-item)
8. [Implementation](#8-implementation)
   1. [Technologies and Frameworks Used](#81-technologies-and-frameworks-used)
      - [The server-side of the application](#811-the-server-side-of-the-application)
      - [Client-side of the application](#812-client-side-of-the-application)
      - [Database](#813-database)
   2. [Application Overview](#82-application-overview)
   3. [Development Process](#83-development-process)
   4. [Graphical User Interface](#84-graphical-user-interface)
      - [Homepage](#841-homepage)
      - [User registration](#842-user-registration)
      - [The login page](#843-the-login-page)
      - [Shop](#844-shop)
      - [Edit profile](#845-edit-profile)
      - [Admin panel](#846-admin-panel)
      - [Members](#847-members)
      - [Messaging](#848-messaging)
9. [Conclusion](#9-conclusion)
    
## 1. Introduction

The fitness industry is becoming more popular day by day. Everybody wants to be in a
good shape, healthy, and be their best version. Being healthy and fit is one of the most
important things in life. Regular exercise can help the body achieve its desired shape and
prevent it from gaining weight. It also lowers the risk of certain diseases like obesity, high
blood pressure, heart disease, and more. Not to forget that it helps significantly mentally by
reducing depression and insomnia, while also increasing confidence and producing positive
energy [5].
It is important to have proper equipment and clothing to maintain a healthy lifestyle and
achieve fitness goals. Clothing plays a huge role to some individuals. It also provides comfort, boosts confidence, and prevents injuries. The right athletic shoes are particularly crucial
for improved performance and protection against injuries and potential posture problems.
Appropriate clothing also plays a significant role in boosting confidence and maintaining a
positive mindset. However, it is equally important to consider the equipment that can make
your fitness routine better. Using the right equipment, such as dumbbells, resistance bands,
or exercise mats, is crucial for performing a variety of exercises and effectively targeting
specific muscle groups. Smartwatches can be valuable tools for monitoring progress, tracking heart rates, and setting goals. Additionally, accessories like gloves, wrist wraps, or knee
sleeves offer support and protection during workouts, minimizing the risk of injuries. By
paying attention to the broader range of equipment options, one can further optimize their
fitness journey while maintaining the same style and emphasis on the importance of both
clothing and equipment.
On the other hand, social interaction can also play a big role in one’s fitness journey.
One can have a lot of excuses to skip a workout, but if they have a gym buddy or a crush on
someone at the gym, it may motivate them to follow their journey without making excuses.
Research shows that working out with a buddy is more motivating than training on your
own [10], and that having a peer, a friend, or a buddy can help to stay more consistent with
nutrition and training [2].
The goal of the diploma thesis is to develop a platform that offers affordable gym clothing and equipment while promoting social interaction among fitness enthusiasts. The thesis
focuses on developing specific features to improve the overall fitness experience and make it
more accessible for users.
Through my system, users can access a wide selection of pre-owned gym equipment and
clothing at affordable prices, allowing them to obtain the necessary items without the burden of purchasing brand-new products. Additionally, the platform fosters social interaction
by enabling users to connect with like-minded individuals, establish workout partnerships, and engage in supportive communication. By combining accessible equipment, affordable
clothing, and a motivating social environment, my solution aims to empower individuals to
pursue their fitness goals with ease, enjoyment, and sustained motivation.
This thesis is structured as follows: In the second chapter, I review existing social media
platforms such as Tinder, MyProtein, and Polleo Sport, highlighting their differences from
my application. Chapter 3 defines the problem that my system aims to address. Chapter 4
focuses on the application’s functional requirements, outlining the specific features it will
include. Chapter 5 explores the non-functional requirements, encompassing aspects like performance, security, and usability. In Chapter 6, a feasibility study is conducted to assess the
application’s practicality and viability. Chapter 7 delves into the system architecture, presenting UML diagrams that show the structure and interactions of the application’s components.
Chapter 8 provides an overview of the implementation of the application, detailing the technologies and frameworks used and the development process. Chapter 9 concludes the thesis
by highlighting the system’s features and discussing potential future enhancements.

## 2. Related Work

Here I review some of the most popular and widely used platforms for social interaction and
e-commerce: Tinder, MyProtein, and Polleo Sport.
### 2.1 Tinder
Tinder (https://tinder.com/) is an online dating platform that allows matching and messaging between users. As the world’s most popular dating application, Tinder offers a userfriendly interface and comprehensive functionality. Users can create an account to access the
standard features of matching and messaging. After creating an account, they can match with
other users by swiping right.
However, a specialized application is needed if one is looking for a platform specifically
designed for gym members to interact and match with each other in the fitness world. Tinder
does not offer such features. Tinder also lacks search functionality, making it difficult to
retrieve a user who has accidentally swiped left or when the application is turned off.

### 2.2 MyProtein
MyProtein (https://si.myprotein.com/) is an e-commerce website where one can buy
brand-new sports equipment, clothes, and supplements. It is a popular website among fitness
enthusiasts in Slovenia. Users can easily browse through various categories of products without having to register. The website offers convenient navigation based on user preferences,
utilizing various filters such as size, price, color, type, and more. The website also provides
sorting functionality, allowing users to sort by name, price (both ascending and descending),
popularity, discount, and more. However, MyProtein only offers products manufactured by
its brand. While promoting their brand is not an issue, it would be beneficial to have more
brands available in one place. Additionally, the prices of MyProtein are relatively high, despite the availability of discounts
### 2.3 Polleo Sport
Polleo Sport (https://polleosport.si/) is an e-commerce website where users can explore and purchase sports equipment, accessories, and clothes. Along with a wide selection
of products, Polleo Sport also provides customers with a variety of supplements, including
proteins, vitamins, minerals, and more. The website features a user-friendly interface with
various sorting and filtering functionalities. This allows users to easily navigate and search based on specific criteria such as size, color, price, and brand. Also, compared to MyProtein,
Polleo Sport offers a broader range of products, providing customers with a wider selection
of options. However, Polleo Sport is known for its higher prices, which may pose a challenge
for budget-conscious shoppers seeking quality clothing and equipment.
### 2.4 Conclusion
While existing platforms like Tinder, MyProtein, and Polleo Sport offer certain functionalities, they fall short of addressing the specific needs of gym members and fitness enthusiasts.
Our application aims to bridge these gaps by providing a specialized platform for social interaction among gym members and offering a wide range of affordable options for purchasing
quality gym clothes and equipment. Additionally, our platform addresses the shortcomings
of existing solutions by incorporating search functionality, where users can find their matches
and buddies, a diverse selection of brands, and competitive pricing. By focusing on these key
areas, our application provides a comprehensive solution to enhance the fitness journey for
users.

## 3. Definition of the Problem
Fitness individuals and/or newcomers face two main challenges: the high prices of affordable
and quality gym clothes and equipment and the lack of social interaction within the fitness
community. The traditional approach is to purchase brand-new equipment, which can be
expensive, and this makes it difficult for someone who is on a budget. Additionally, there
is currently no platform that allows users to connect with other gym enthusiasts on a more
personal level.
The costs of gym equipment and clothing are constantly increasing, making it challenging to even find a pair of shorts for under 30 euros. This significant impact can demotivate
individuals from continuing their exercise routines. They can feel guilty for not having the
proper equipment to work out or the proper clothes to wear while exercising. It is a psychological game in which they can think that others are making fun of them, although this
is further from the truth. It can also lower their confidence level, and as a result, they will
perform worse every day. For these reasons, interest in second-hand equipment is on the rise,
with few options to buy it online.
The second issue is that the lack of social engagement in the gym community can make
individuals’ experiences a bit boring. Without a platform to connect with like-minded individuals, it becomes challenging to find workout partners, share experiences, and receive the
necessary support. The lack of social interaction reduces motivation and makes the journey
less interesting than it can be. A platform to connect gym users may help promote a healthier
lifestyle and motivate them to get into the fitness world.
In conclusion, fitness individuals face significant challenges regarding expensive clothes
and social interaction in gyms. These factors not only affect their performance but also impact their motivation, consistency, discipline, confidence, and overall enjoyment of their
fitness journey. Finding a solution to these challenges is really important for creating more
supportive and pleasant places for individuals to pursue their goals effectively.

## 4. Functional Requirements
1. The system shall provide a simple sign-up process, allowing individuals to create their
accounts. The registration form shall consist of required and optional fields.
(a) When registering, users shall provide information such as their email, password,
gender, display name, date of birth, city, and country. These fields shall be mandatory.
(b) After that, users shall have the option to further enrich their profiles by filling
in recommended, yet non-obligatory fields. These additional fields include a description, details about what they are seeking, interests, and the option to upload
photos.
2. Users shall have the option of signing into the system using their unique email and
password. Additionally, the system shall allow the users to easily edit and update their
profiles.
3. The system shall provide users with a list of products, along with filtering and sorting
options. Users shall be able to easily navigate and find desired products using a variety
of filters and sorting methods. The system shall offer filtering options based on brand
and type. Additionally, users shall be able to search for a product by its name. The
system shall also have sorting functionality. Users shall be able to sort products based
on price, both in ascending and descending order, as well as alphabetically by name.
4. Users shall be able to add products to their basket directly from the product list or
access more information about each product. From the product details page, users
shall be able to update the quantity of the selected item and view the quantity of that
specific product already presented in their basket.
5. The system shall allow users to list the products for sale. Users shall enter the product
name, description, price, brand, and select their type, as well as provide a photo of the
product.
6. Once users have selected their desired products for purchase, they shall be able to
easily review and manage their basket, as well as update the quantity of the products,
before proceeding to checkout.
7. Once users proceed to checkout, they shall be able to enter their delivery address,
which can be updated and set as the default for future orders. After that, users shall be
able to select a delivery method from a choice of four options, each offering different
pricing and estimated delivery timeframes. Following that, users shall proceed to the
final step, where they shall enter their payment details. The payment information includes the cardholder’s name, card number, expiry date, and CVC (Card Verification
Code).
8. Once the payment process is completed, whether it is successful or unsuccessful, the
system shall allow users to view their order(s) and order history.
9. The system shall also provide users with a list of members, along with filtering and
sorting options. Users shall be able to easily navigate and find gym members using a
variety of filters and sorting methods. The system shall offer filtering options based on
age and gender. Additionally, users shall be able to utilize the search functionality to
directly find members by name. The system shall also have sorting functionality. Users
shall be able to sort members based on the date of registration and recent activities.
10. The system shall allow user interaction between users directly from the product list.
Users shall be able to easily like or match with each other with a simple click. Additionally, users shall be able to directly access the profiles of other users to gain more
information. For communication, the system shall provide a message tab where users
can exchange messages with each other.
11. The system shall allow users to view their matches, see the users they have liked, and
see the users who have liked them.
12. Users shall have access to three message categories: unread, sent, and received messages, ensuring easy navigation and organization of their communication.
13. The system shall allow users to upload their photos, which will have to be approved
by a moderator or the administrator. If the photos are approved, users shall be able to
choose a particular photo to be their profile picture.
14. Administrators shall have the capability to edit the roles (Member, Moderator, and
Administrator) of users, as well as approve or reject users’ uploaded profile photos.
Moderators shall only have the authority to approve or reject users’ uploaded profile
photos.

## 5. Non-Functional Requirements
1. The system should be able to be used by anyone who has access to the internet and a
computer.
2. The application should be web-based only.
3. The system should perform quickly by allowing users to browse their products and
desired members.
4. The system should allow the users to communicate via messages no matter the distance
or time zones.
5. The system should be able to handle large numbers of users without having an impact
on performance.
6. The system should implement security to protect user data such as personal information, payment details, and private conversations.
7. The UI of the system should be user-friendly so that users can navigate easily through
the application.
8. The system should be able to integrate with external services such as Stripe as a payment service and SignalR as a live-messaging service.

## 6. Feasibility Study
One possible solution is to create a system that will offer users the opportunity to purchase
used products at a lower price. With this, we address a significant problem for individuals
who want to continue their fitness journey, which requires proper equipment and clothing
while maintaining quality as much as possible. However, they can acquire these items for a
way lower price, so that they can feel safe and motivated. Additionally, by allowing users to
list products for sale, our system provides an opportunity for individuals to sell these items
at a lower price compared to their market value. This creates a win-win scenario for both the
seller and the buyer. The seller won’t feel that the product is being wasted, and the buyer will
receive the best possible quality for the price they are paying.
To address the issue of social interaction in gyms, a platform can be created where all
registered members of our system from a specific fitness institution are listed. This enables
users to interact with others and make more connections. By incorporating features such as
liking or matching with other users and messaging them, we establish a safe system where
users can feel more confident about approaching someone in the gym. This can be helpful
not only for the dating aspect of life but also for the social aspect in general. Users can make
more connections, meet like-minded friends, communicate with them, share experiences,
and more.
Looking at the technical feasibility, the system will be developed as a web-based application that provides accessibility for users with internet and computer access.
The most demanding parts of our system are safe shopping and live communication between members. However, neither should be a problem, especially the payment process, as
there is a service called Stripe that offers advanced security measures to ensure safe and secure online transactions. We won’t need to worry about any legal or security issues regarding
payments since Stripe takes care of that. It is easily implemented since there is a Nuget package for Stripe that can be used in .NET for the backend, and there is also a Node package
for Angular. The backend and the frontend can communicate easily by sharing a publishable
key [9].
There is a service for taking care of the live messaging as well. It is called SignalR.
SignalR is a real-time web application framework that allows us to establish connections
between the server and clients, which enables the server to push updates to the connected
clients in real-time. The framework utilizes multiple transport mechanisms, such as WebSockets, Server-Sent Events (SSE), and long polling, to establish a communication channel
between the server and clients. There exists a package for .NET and Angular, which makes
the solution feasible [11].
We can use the Angular framework, as mentioned earlier, which uses TypeScript. Similarly, we can have a RESTful backend by utilizing the ASP.NET Web API as a framework,
which employs C# as a programming language. We won’t be storing a huge amount of data
since the basket and basket items will be stored in Redis, an in-memory or cache database.
For the other data, we can use the SQL database PostgreSQL. From a legal perspective,
there are some laws and restrictions that need to be considered for the payment process. But,
as mentioned earlier, Stripe can handle that aspect. For the other functionalities, there shall
be no restrictions that would make this solution not feasible. Regarding cultural beliefs and
norms, there shall be no restrictions as well. But, there will be a need to pay for Stripe. The
prices for online transactions are (per https://stripe.com/en-si/pricing#pricing-details)
• For European cards (e.g., cards issued in the European Economic Area or the UK):
1.5% + 0.25 EUR per successful transaction.
• For non-European cards: 3.5% + 0.25 EUR per successful transaction.
However, we will get a lot of benefits, such as support for more than 135 currencies, diverse
payment methods, advanced security, analytics and reporting, and way more.
Another thing that needs to be considered is the web server. The system can be hosted on
the cloud, which makes the job easier if the server needs to be upgraded or downgraded.
The project enables free communication between the users and education based on their
goals. It is beneficial to look through such information and try to maintain a healthy lifestyle.
This is all socially acceptable. It does not force anyone to follow such a lifestyle. It is all
optional.

## 7. System Architecture
We will describe our system’s architecture through a selection of UML diagrams [4]. UML
stands for Unified Modeling Language. UML diagrams represent the plan of the system.
They demonstrate all the functionalities and operations of the properties that are in the system.
### 7.1 Entities and Their Relationships
Figure 1 shows all the entities of our system, their attributes, and the relationships between
them. Entity User represents a user of the application. Each user can have different roles, and each role can be associated with multiple users, which means that the relationship between User and Role is many-to-many.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/219f2db6-8d64-439f-8fdf-38bd50835e36" alt="ER Diagram">
</p>
<p align="center">
  <em>Figure 1: Entity Relationship Diagram</em>
</p>
The Address entity represents the information on
the user’s home address. Multiple users can share the same address, thus, the relationship is
many-to-one. The Photo entity represents a photo associated with a user, and each user can
have multiple photos, which means that we have a one-to-many relationship between User
and Photo. Users can send many messages to many users as well as receive messages from
many users. This relationship is many-to-many. In a similar style, we have a many-to-many
relationship between User and UserLike, where each user can like multiple users, and each user can be liked by multiple users. The Order entity represents an order placed by a user.
Order has a one-to-many relationship with OrderItem, which represents an item within an
order. This means that one order can have multiple items. Multiple orders can share the same
delivery method, leading to a many-to-one relationship between Order and DeliveryMethod,
which represents the delivery method available for the order. The Product entity represents
the product available in the shop. It has a many-to-one relationship with both ProductType
and ProductBrand which represent the type and brand of the product. The Group entity represents the group that consists of two users in the real-time communication system. It has
a one-to-many relationship with Connection, which is the connection made by a user in the
application. The Basket entity represents the user’s shopping basket. It can have multiple
basket items, thus, it has a one-to-many relationship with BasketItem, which represents the
item in the basket.

### 7.2 Database Design
Our system uses a relational database model, which is visualized in Figure 2. In our system,
we have tables User and Message. In Message, we have two foreign keys, source user id
and target user id which are both related to the User entity or User’s primary key. When
we have many-to-many relationships, we often have a join table, like in our example with
User and Role. However, that is not the only case. We also have many-to-many relationships
between the User and Messages, as well as between the User and User Like. The Message
table serves as a bridge between AppUser entities, connecting the sender and recipient. Each
row in the Message table represents a single message, with the SenderId and RecipientId
identifying the corresponding AppUser entities involved in the conversation. Therefore, in
our scenario, the Message table can act as a junction table to establish the many-to-many
relationship between AppUser entities.
The same thing applies to User and User Like. So, even though there is no explicitly
defined joint table, the Like table in this code can fulfill the role of a junction table, allowing
a many-to-many relationship between AppUser entities. One user can like many users, and
one user can be liked by many users.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/b52969a9-6d06-4a06-913e-57940502f764" alt="Relational Model">
</p>
<p align="center">
  <em>Figure 2: Relational model</em>
</p>

### 7.3 Object-Oriented Approach
We use an object-oriented paradigm to implement our system. The UML Class diagram in
Figure 3 represents the relationships between all the classes we define. Also, here we can
see a different kind of relationship. The one that is between the Message, Photo, Address,
User LIke and the User is called Composition. That means the entities can’t stand on their
own. If the User does not exist, then we won’t have any of the mentioned entities. When we delete a user, everything is deleted as well. Another type of relationship is Association. It
represents a simple relationship between two entities, as between Order and DeliveryMethod.
There also exists a relationship called Aggregation, which is a special type of Association, as
we have between Product and ProductBrand. Here, a product brand can be inside the product
but does not have to. It can also stay on its own.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/35c90cf7-b3b2-4efc-9f46-62c35619490d" alt="UML CLass Diagram">
</p>
<p align="center">
  <em>Figure 3: UML CLass Diagram</em>
</p>

### 7.4 Use Cases
Here we describe a few of the most common use cases for our system. To detail a particular
use case, we will complement use case diagrams with sequence diagrams. Use case diagrams
illustrate the interactions of actors with the system’s functions, while sequence diagrams are
used to explain the underlying process.
#### 7.4.1 The Use Case diagram for social interaction
In our first use case, visualized as a UML use case diagram in Figure 4, which is about the
social part of the system, we can see that all the functionalities are available to registered
users only. A member can log in (which must be verified), like other members, check their
matches, edit their profile, upload a photo (which must be approved), and send or receive
messages, which are displayed live because of the SignalR service. The Moderator can use
all the functionalities that a member can use but with the additional option to approve users’
photos. The Administrator has all the privileges of moderators, but can also edit users’ roles.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/ca45d794-e68f-4305-be4a-e7493bfe9cea" alt=" Use Case diagram for the social part of the system">
</p>
<p align="center">
  <em>Figure 4: Use Case diagram for the social part of the systeml</em>
</p>

#### 7.4.2 The Sequence diagram for writing a message
First, the user searches for a member in the list and opens a user’s profile page to get more
information about a certain user. After opening the message tab, the user can simply write
a message, which is processed by SignalR to check if the recipient is also on the message
tab. If yes, then the message that was sent will be read at that specific moment. If not, a
notification is sent to the recipient. The sequence of operation is demonstrated as a UML
sequence diagram in Figure 5.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/496394e1-e6a0-4540-9a13-6c944d077be1" alt="UML Sequence diagram for writing a message">
</p>
<p align="center">
  <em>Figure 5: UML Sequence diagram for writing a message</em>
</p>

#### 7.4.3 The Use Case diagram for purchasing an item
Figure 6 shows a use case diagram for shopping in our application. Unlogged users can only
review the products and add them to the basket. If they want to continue to checkout, they
must be logged in. Then, they can also make a payment, which must be verified by Stripe.
They can also add a product for purchase.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/9cb4ee73-f97f-475d-871c-e24d4f9f6b12" alt="Use Case diagram for the shop part of the system">
</p>
<p align="center">
  <em>Figure 6: Use Case diagram for the shop part of the system</em>
</p>

#### 7.4.4 The Sequence diagram for purchasing an item
The sequence to purchase order is the following: First, the user searches for a product in the
list, get the product information, and adds the product to the basket. Then, the user can review
the basket and proceed to checkout. However, the user must be logged in, otherwise, he/she
will be returned to the login page. After that, the user inserts the delivery address, chooses the
delivery method, and inserts the payment information. Then, the payment information is sent
to the backend and the data is processed there. After that, the backend sends the data to Stripe
to verify the payment and receive a response. If the payment is successful, a confirmation
message is sent back to the user, and after that, the user can see the order. In the other case,
the user will receive a payment error with information on why the payment failed. In both
cases, the user can view his/her order in the order history list, but the status of the order will
be different. The sequence of operations is visualized as a UML sequence diagram in Figure
7.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/ba3b1fc3-d722-4299-a99b-23452f1573d8" alt="UML Sequence diagram for purchasing products">
</p>
<p align="center">
  <em>Figure 7: UML Sequence diagram for purchasing products</em>
</p>
The following paragraph is a more detailed description of the communication flow between the user, the API (backend), and Stripe:
1. The user sends a request to the API for processing a payment transaction, where all the
necessary details for the transaction are included, such as the amount, currency, and
customer information.
2. The API receives the request and authenticates and authorizes the user and after that,
it prepares the payment request to be sent to Stripe.
3. The API uses the Stripe API client library to establish a secure connection with the
Stripe server. After that, it sends the payment request to Stripe, including all the necessary information. The request is sent using HTTPS.
4. Stripe receives the payment request from the API, validates the request, ensuring it
contains the required parameters and meets any additional security checks. If it is
valid, Stripe processes the payment transaction using the payment information provided, which communicates with the relevant payment network to authorize and process the payment.
5. Stripe generates the response, which includes information such as the payment status
(success, failure or pending) and any relevant error messages.
6. Stripe sends the response back to the API, and then the API handles it accordingly. If
needed, the API may perform additional tasks, such as updating the database.
7. The API sends the final response back to the user. If the payment is successful, the
client receives a success message. Otherwise, the user receives detailed information
on why the payment failed.

## 8. Implementation
### 8.1 Technologies and Frameworks Used
The system is implemented as a web application. The technologies for implementation were
ASP.NET Web API for the server-side part, Angular for the client-side, PostgreSQL as a
database provider, Stripe to implement the payment system, and Redis to store the basket
and basket items in the memory of the browser.
#### 8.1.1 The server-side of the application
The server-side, also known as the backend of the application, is responsible for processing,
storing, and retrieving data. It serves as a communication channel between the client-side
of the application and the database. In a typical client-server architecture, the backend first
receives requests from clients, processes them, performs any necessary calculations, retrieves
information from the database, and finally sends the response back to the client.
For the server-side of the application, I used the ASP.NET Web API [7], which is a
framework for building HTTP-based services that can be accessed by different applications
on different platforms. I implemented the REST [6, 7, 8] architectural style. REST is an architectural style for designing distributed applications that can communicate with each other
using the HTTP protocol. In a REST-based model, resources represent state and functionality, which are identified through logical URLs. Additionally, the client and server communicate with each other using requests and responses. The main advantages of REST are
scalability, high performance, and high security.
Figure 8 illustrates the communication flow between the client and the server. We can
see that when the client sends a request or calls the API Controller, the Controller interacts
with the business logic, processes the data, and retrieves data from the database. After that,
the Web API sends back the response to the client in the JSON format.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/0e960147-76a7-49e6-9044-51de8fc1b028" alt="The communication flow between the client and the server">
</p>
<p align="center">
  <em>Figure 8: The communication flow between the client and the server</em>
</p>
<p align="center">
  <em>Source: https://www.c-sharpcorner.com/article/asp-net-core-5-0-web-api/</em>
</p>

ASP.NET, as a framework, has a huge ecosystem that provides numerous services. Here are some of the services I have utilized:

- **ASP.NET Identity:** ASP.NET Identity is a service/system provided by Microsoft as part of the .NET framework ecosystem. It facilitates user registration, application login, secure password hashing, and user authorization/role management. ASP.NET Identity includes services such as UserManager, which helped me query the users, and SignInManager, which helped me with user login functionality.

- **JWT:** .NET also offers a package for authentication using JSON Web Tokens (JWT). JWT enables clients to authenticate with our API by providing a text string containing client information, which is then signed by the API server. When the client presents a token to the API, the server can verify its authenticity. If the signature is verified, the client is granted access to perform the desired actions.

- **Stripe:** The Stripe package for .NET is a useful tool for seamless integration of Stripe payment processing into .NET applications. Stripe helped me to efficiently and securely manage payments and subscriptions. The package also offers support for webhooks and customizable checkout forms, making it a reliable choice for building payment solutions in .NET.

- **SignalR:** The SignalR library for .NET simplifies real-time communication in applications. It offers integration, enabling instant data transmission and bidirectional communication.

- **Redis:** .NET also has a package for Redis, which is an in-memory or cache database. It uses a key-value pair structure. I have used Redis to store the basket and its items in the memory of the browser. The memory or cache will be deleted automatically after some time if the user doesn’t update the basket or proceed to checkout. Once the user buys the items, the basket is deleted automatically.


#### 8.1.2 Client-side of the application
The client-side, or frontend of the application, represents the first impression for users, as well as the design of the application, which, in most cases, should be intuitive. For the client side of the application, I used Angular [1, 12], which is a Javascript framework written in Typescript. It is used for building dynamic single-page applications (SPAs). Angular as a framework has a huge ecosystem that offers numerous features and packages, such as:

- **@stripe/stripe-js:** This package helped me validate card information on the frontend, including the card number, expiration date, and CVC. It ensured that only valid card details were submitted for processing, reducing errors and failed payment attempts. Additionally, the package provided informative error messages in case of validation or payment failures, allowing me to handle these scenarios and provide meaningful feedback to users.

- **@microsoft/signalr:** By integrating SignalR into my Angular application, I was able to establish seamless real-time communication between the client and server. The Angular package simplified the integration process, aligning with Angular development conventions and enabling me to implement real-time features with ease.

- **Guards:** Angular provides us with guards, which are used to control access to certain rules or functionalities in the system. This helped me implement authentication and authorization logic to protect sensitive areas of my system, specifically for checking if the user is authenticated to perform certain functionalities and determining if the user is an admin or moderator.

- **Interceptors:** Another powerful feature of Angular are interceptors. They allow us to intercept and modify HTTP requests and responses. Interceptors can be used to add headers, handle errors, transform data, or perform other custom operations globally across the application. I have made use of Angular’s interceptors for error handling and added a header for the JWT to check authorization.

#### 8.1.3 Database
To store the data, I used PostgreSQL [3], which is an open-source relational database management system (RDBMS) emphasizing extensibility and SQL compliance. To access the
database from the .NET framework, I used a package called PostgreSQL, which makes it
easy to query and control the data by using SQL or LINQ methods and extensions.

### 8.2 Application Overview
In Figure 9, we can see the overview of the system and its communication flow. Now, let’s describe the illustration in detail.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/6ec48f7d-1029-4f74-a3a3-a91e2fa28758" alt="The communication flow in the syste">
</p>
<p align="center">
  <em>Figure 9: The communication flow in the system</em>
</p>
When two or more members communicate with each other
via SignalR, the client first communicates with the API using HTTP (RESTful) requests.
The API, upon receiving the HTTP request, processes it and may use SignalR to send realtime updates or notifications back to the Angular client. SignalR, which sits on top of the
.NET Web API, enables real-time communication by establishing a WebSocket connection between the server and the client. So, the client first communicates with the API using HTTP
requests, and then the API communicates with SignalR to send real-time updates to the client.
This is for establishing live messaging between the members.
After the request has been made to the server, it first touches the Controller. After that,
the API processes the data and communicates with the database (PostgreSQL) to retrieve or
store the information. I am using the Unit of Work (UoW) pattern, which is a design pattern
that is used to manage transactions and ensure data consistency in the system. It is used
together with the Repository pattern to provide an abstraction layer between the data access
layer and the business logic layer. After that, the Repository pattern uses Entity Framework
Core to translate the operations into database queries. EF Core then communicates with
PostgreSQL to execute the queries and retrieve the results. In summary, the flow involves the
Controller handling the initial request, followed by the application using the UoW pattern in
conjunction with the Repository pattern. The Repository pattern uses EF Core to translate
operations into database queries, and EF Core communicates with PostgreSQL to execute
these queries and retrieve the results.
The procedure is essentially the same when the controller interacts with the services. The
services act as an intermediary between the Controller and the data access layer, or database.
The difference is that the services provide higher-level operations that may involve multiple
repository methods or additional processing. In our system, we have three services: Payment,
Order, and Token. The Payment service communicates with the Basket Repository, which is
not part of the UoW pattern, only because the Basket repository uses Redis instead of EF
Core. It also communicates with Stripe using the HTTPS protocol for secure communication.

### 8.3 Development Process
In this section, I provide an overview of the implementation process of the application, detailing the technologies, tools, and services utilized. The application was developed using Angular 15, .NET 7, and PostgreSQL as the core technologies, with additional tools such as VS
Code, GitKraken, and Postman facilitating the development workflow. Additionally, Stripe
was integrated as the payment service, while SignalR was employed as a live-messaging
service.
To initiate the development process, I utilized Visual Studio Code (VS Code) as my
integrated development environment (IDE) for both the frontend and backend components.
The frontend of the application was built using Angular 15, a popular JavaScript framework. Angular’s component-based architecture enabled the creation of reusable UI components, enhancing code modularity and maintainability. To set up the development environment, I installed the necessary dependencies and extensions in Visual Studio Code. This
included the Angular CLI (Command Line Interface) to manage the Angular project. I utilized Node.js and npm (Node Package Manager) to manage packages and dependencies for
the project. Additionally, I configured the development environment with relevant TypeScript
configurations, such as enabling strict typing.
For the backend development, I utilized the .NET Web API (.NET 7) to create a scalable
API for my application. The .NET Web API framework provided a powerful set of tools
and libraries that allowed me to develop RESTful endpoints and handle HTTP requests efficiently. To set up the backend development environment, I installed the .NET SDK and
configured it in Visual Studio Code. This allowed me to create and manage the .NET Web
API project seamlessly. I used C# as the primary programming language for the backend
development, taking advantage of its strong typing and extensive ecosystem.
To interact with the PostgreSQL database, I utilized Entity Framework Core, an ObjectRelational Mapping (ORM) framework for .NET. Entity Framework Core simplified database
operations by providing an abstraction layer and allowing me to work with the database using
C# code.
During the development process, I used Postman as a tool for testing the API endpoints
and ensuring their proper functionality.
For version control and collaboration, I used GitKraken, a Git client that enhanced my
workflow.
In summary, the implementation process involved the use of Visual Studio Code as the
IDE, GitKraken for source control, .NET Web API for backend development, and Angular 15
for frontend development. PostgreSQL served as the database, while Stripe was integrated
as the payment service, and SignalR facilitated live messaging functionality.
### 8.4 Graphical User Interface
In this section, we will take a look at the GUI of the main functionalities of the application.
#### 8.4.1 Homepage
The application is designed in such a way that unregistered users can only see the listed
products, from where they can also add products to the basket, but to buy them, they need to
be registered and logged in. The homepage of the application is shown in Figure 10.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/d117588b-cade-4501-a783-18890ef7c04f" alt="Homepage">
</p>
<p align="center">
  <em>Figure 10: Homepage</em>
</p>

#### 8.4.2 User registration
Users can register to the system by entering their gender, display name, email, password,
date of birth, city, and country, as shown in Figure 11.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/8cb45309-fd4d-473f-9756-dda6bdca5596" alt="Registration form">
</p>
<p align="center">
  <em>Figure 11: Registration form</em>
</p>

#### 8.4.3 The login page
Users can log in to the system by entering their email and password. The screenshot of the
login is shown in Figure 12.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/8582c151-a9e3-4482-a5c8-6b29038f6709" alt="The login form">
</p>
<p align="center">
  <em>Figure 12: The login form</em>
</p>

#### 8.4.4 Shop
Users can browse the products that are listed in the shop. They can add a product from the
list to the basket and view the detailed information about the product. They can also use
the filters for brands and product types, sort the products alphabetically, by descending or
ascending prices, or search for a product by its name. The screenshot of the shop is shown in
Figure 13.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/1f616ea5-8854-4ecd-811c-0f8728ff215b" alt="The shop page">
</p>
<p align="center">
  <em>Figure 13: The shop page</em>
</p>
After the user adds their desired products to the basket, he/she can review the basket
before proceeding to checkout, as shown in Figure 14.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/e74d20a0-af55-4333-b10e-500191716806" alt="Reviewing the content of the basket">
</p>
<p align="center">
  <em>Figure 14: Reviewing the content of the basket</em>
</p>

After that, the users can proceed to checkout, where they need to fill in the necessary information: their address, delivery method, and the payment method. This is shown in Figure
15.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/f5c0fbf1-0241-4a90-a1c4-88dcf07ad34a" alt="Checkout">
</p>
<p align="center">
  <em>Figure 15: Checkout</em>
</p>

#### 8.4.5 Edit profile
After registering, the users are redirected to their details page to fill in some more information
about themselves, such as a description, what they are looking for, their interests, and adding
a photo. This page is also seen by other users if they want to know more details about a
specific user. The user-detailed page is shown in Figure 16. In Figure 17, we can see the form
for uploading a photo, which must later be approved by a moderator or the administrator.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/03d6ef41-24c8-4711-8ab4-4c67710b82f3" alt="Editing the user information">
</p>
<p align="center">
  <em>Figure 16: Editing the user information</em>
</p>
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/7715f5a4-1769-4c54-ae18-5f86086fead0" alt="Uploading photo">
</p>
<p align="center">
  <em>Figure 17: Uploading photo</em>
</p>

#### 8.4.6 Admin panel
The admin panel is available only to users who are in the role of Moderator or Administrator.
The administrators can edit roles and modify photos. The moderators can only see the ”Photo
Management” panel, where they can modify the photos that need to be approved or rejected.
The administration panel is shown in Figure 18.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/c998edb2-e0d3-4f44-8ba3-bfc0dc888056" alt="The administrator’s panel">
</p>
<p align="center">
  <em>Figure 18: The administrator’s panel</em>
</p>

#### 8.4.7 Members
In the Members’ List, the users can see the other registered users and interact with each other.
From the members’ list, users can like, message, and view the profiles of other users. Users
can use the filters for age and gender. They can also search for a member by their name and
sort the members based on the date of registration and recent activities. The members’ list is
shown in Figure 19.
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/097ecc7b-6b42-4730-9ada-0a88c80424ff" alt="Members’ list">
</p>
<p align="center">
  <em>Figure 19: Members’ list</em>
</p>

#### 8.4.8 Messaging
In the messaging tab, which can be accessed directly from the list or user-detailed page, users
can write messages to other users. The messaging functionality is shown in Figure 20. If the recipient has not read the message yet, he/she will be able to see it in the Message tab in the
Unread section, as shown in Figure 21
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/71a445c8-e8b2-471c-86a0-9c5c484a36ca" alt="Messaging">
</p>
<p align="center">
  <em>Figure 20: Messaging</em>
</p>
<p align="center">
  <img src="https://github.com/curry0/Final-Project/assets/62909270/f784c91c-b3ba-4ac1-bc31-8376348a7bdf" alt="Unread messages">
</p>
<p align="center">
  <em>Figure 21: Unread messages</em>
</p>

## 9. Conclusion
The fitness industry is growing in popularity, and maintaining a healthy lifestyle is important
for physical and mental well-being. Proper clothing and equipment are crucial for comfort,
safety, and confidence during workouts. Social interaction can provide motivation and support during the fitness journey. However, existing platforms like Tinder, MyProtein, and
Polleo Sport have limitations in addressing these needs.
Therefore, I have implemented a system that offers affordable fitness clothing and equipment and encourages social interaction among gym members, where the members can connect, make friends, and find workout partners and soulmates. The system helps individuals
overcome challenges and enhance their motivation, consistency, confidence, and overall enjoyment of their fitness journey.
The system has been implemented as specified in this diploma thesis, but it is not perfect
yet. The system can be extended in a variety of ways. One thing that needs to be resolved
in the future is how to connect the two parts of the system, the shop and social interaction,
because currently, these two parts work as separate services. One way to do this is to include
some kind of forum where the users could share their ideas, and create posts as a group, not
just as individuals. They could, for example, share a post about the products they have bought
and express their opinions. The forum itself would be a great asset in general. The users
would be able to share their opinions and satisfaction with the gym, the trainers, etc. The
system could also include an additional role “Trainer”, and some filters so that the members
could easily find the trainers they need, connect with them, and talk to them. They would
be able to efficiently schedule a gym session, talk about their progress, and more. Another
thing that would be worth implementing is a possibility of virtual gifting, where the users
could send virtual gifts to other members as a way of showing interest or appreciation. When
a gift is purchased, it can be personalized with a message and sent to the recipient. And
once a member receives a virtual gift, they would be notified about it through our social
media system. They could view the gift, read the message, and choose to accept or decline
it. Another thing that should be considered is to have the option to block a user, so that they
would not be able to spam the users who are not interested in them.
My future plans are to connect the shop and the social part first and then develop it into
a mobile application. Once this is accomplished, the system will be prepared for production
and can potentially be integrated into gyms.

