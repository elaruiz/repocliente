

import messagesRoute from "./MessagesRoute";
import plansRoute from "./PlansRoute";
import usersRoute from "./UsersRoute";
import membershipsRoute from "./MembershipsRoute";
import searchesRoute from "./SearchesRoute";
import transactionsRoute from "./TransactionsRoute";
import reportsRoute from "./ReportsRoute";

export default [
    ...messagesRoute,
    ...plansRoute,
    ...usersRoute,
    ...membershipsRoute,
    ...searchesRoute,
    ...transactionsRoute,
    ...reportsRoute
];

