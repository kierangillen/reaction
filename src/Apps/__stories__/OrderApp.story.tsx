import {
  Buyer,
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  OfferOrderPickup,
  OfferOrderWithOffers,
  OfferOrderWithShippingDetails,
  Offers,
  OfferWithTotals,
  PaymentDetails,
  ShippingTotals,
  TaxTotals,
  UntouchedBuyOrder,
  UntouchedOfferOrder,
} from "Apps/__tests__/Fixtures/Order"
import { MockRouter } from "DevTools/MockRouter"
import moment from "moment"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as orderRoutes } from "../Order/routes"

const Router = ({ order, ...props }: any) => (
  <MockRouter
    routes={orderRoutes}
    mockData={{
      order,
      me: {
        name: "Dr. Collector",
      },
    }}
    historyOptions={{ useBeforeUnload: true }}
    context={{
      mediator: {
        trigger: x => x,
      },
    }}
    {...props}
  />
)

storiesOf("Apps/Order Page/Buy Now/Shipping", module)
  .add("Shipping - Pre-filled", () => (
    <Router
      initialRoute="/orders/123/shipping"
      order={BuyOrderWithShippingDetails}
    />
  ))
  .add("Shipping - Untouched Order", () => (
    <Router
      // The UntouchedBuyOrder has a specified requestedFulfillment, but it should be null.
      // Unfortunately, enough of our tests use UntouchedBuyOrder to change it, so we'll specify it here to avoid breaking our story.
      order={UntouchedBuyOrder}
      initialRoute="/orders/123/shipping"
    />
  ))

storiesOf("Apps/Order Page/Buy Now/Review", module).add("Review", () => (
  <Router
    initialRoute="/orders/123/review"
    order={{
      ...BuyOrderWithShippingDetails,
      ...TaxTotals,
      ...ShippingTotals,
    }}
  />
))

storiesOf("Apps/Order Page/Buy Now/Payment", module)
  .add("With 'Ship'", () => (
    <Router
      initialRoute="/orders/123/payment"
      order={BuyOrderWithShippingDetails}
    />
  ))
  .add("With 'Pickup'", () => (
    <Router initialRoute="/orders/123/payment" order={BuyOrderPickup} />
  ))

storiesOf("Apps/Order Page/Buy Now/Status", module)
  .add("submitted (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...BuyOrderWithShippingDetails,
        state: "SUBMITTED",
      }}
    />
  ))
  .add("submitted (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...BuyOrderPickup,
        ...PaymentDetails,
        state: "SUBMITTED",
      }}
    />
  ))
  .add("approved (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...BuyOrderWithShippingDetails,
        state: "APPROVED",
      }}
    />
  ))
  .add("approved (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{ ...BuyOrderPickup, ...PaymentDetails, state: "APPROVED" }}
    />
  ))
  .add("fulfilled (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...BuyOrderWithShippingDetails,
        state: "FULFILLED",
      }}
    />
  ))
  .add("fulfilled (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{ ...BuyOrderPickup, ...PaymentDetails, state: "FULFILLED" }}
    />
  ))
  .add("canceled (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...BuyOrderWithShippingDetails,
        state: "CANCELED",
      }}
    />
  ))
  .add("canceled (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{ ...BuyOrderPickup, ...PaymentDetails, state: "CANCELED" }}
    />
  ))
  .add("refunded", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{ ...BuyOrderPickup, ...PaymentDetails, state: "REFUNDED" }}
    />
  ))

storiesOf("Apps/Order Page/Make Offer/Offer", module).add("Empty", () => (
  <Router
    initialRoute="/orders/123/offer"
    order={{
      ...UntouchedOfferOrder,
      requestedFulfillment: null,
    }}
  />
))

storiesOf("Apps/Order Page/Make Offer/Shipping", module)
  .add("Shipping - Pre-filled", () => (
    <Router
      initialRoute="/orders/123/shipping"
      order={OfferOrderWithShippingDetails}
    />
  ))
  .add("Shipping - Empty", () => (
    <Router order={OfferOrderWithOffers} initialRoute="/orders/123/shipping" />
  ))

storiesOf("Apps/Order Page/Make Offer/Payment", module)
  .add("With 'Ship'", () => (
    <Router
      initialRoute="/orders/123/payment"
      order={OfferOrderWithShippingDetails}
    />
  ))
  .add("With 'Pickup'", () => (
    <Router initialRoute="/orders/123/payment" order={OfferOrderPickup} />
  ))

storiesOf("Apps/Order Page/Make Offer/NewPayment", module)
  .add("With 'Pickup'", () => (
    <Router
      initialRoute="/orders/123/payment/new"
      order={{
        ...OfferOrderPickup,
        state: "SUBMITTED",
        stateExpiresAt: moment()
          .add(1, "day")
          .toISOString(),
        lastOffer: {
          ...OfferWithTotals,
          createdAt: moment()
            .subtract(1, "day")
            .toISOString(),
        },
        awaitingResponseFrom: "BUYER",
        lastTransactionFailed: true,
        offers: { edges: Offers },
        buyer: Buyer,
      }}
    />
  ))
  .add("With 'Ship'", () => (
    <Router
      initialRoute="/orders/123/payment/new"
      order={{
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
        stateExpiresAt: moment()
          .add(1, "day")
          .toISOString(),
        lastOffer: {
          ...OfferWithTotals,
          createdAt: moment()
            .subtract(1, "day")
            .toISOString(),
        },
        lastTransactionFailed: true,
        awaitingResponseFrom: "BUYER",
        offers: { edges: Offers },
        buyer: Buyer,
      }}
    />
  ))
storiesOf("Apps/Order Page/Make Offer/Review", module).add("Review", () => (
  <Router
    initialRoute="/orders/123/review"
    order={OfferOrderWithShippingDetails}
  />
))

storiesOf("Apps/Order Page/Respond", module)
  .add("Respond", () => (
    <Router
      initialRoute="/orders/123/respond"
      order={{
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
        stateExpiresAt: moment()
          .add(1, "day")
          .toISOString(),
        lastOffer: {
          ...OfferWithTotals,
          createdAt: moment()
            .subtract(1, "day")
            .toISOString(),
        },
        awaitingResponseFrom: "BUYER",
        offers: { edges: Offers },
        buyer: Buyer,
      }}
    />
  ))
  .add("Review (counter)", () => (
    <Router
      initialRoute="/orders/123/review/counter"
      order={{
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
        stateExpiresAt: moment()
          .add(1, "day")
          .toISOString(),
        lastOffer: {
          ...OfferWithTotals,
          id: "last-offer",
          createdAt: moment()
            .subtract(1, "day")
            .toISOString(),
        },
        myLastOffer: {
          ...OfferWithTotals,
          id: "my-last-offer",
          fromParticipant: "BUYER",
          createdAt: moment()
            .subtract(1, "minute")
            .toISOString(),
        },
        awaitingResponseFrom: "BUYER",
        offers: { edges: Offers },
        buyer: Buyer,
      }}
    />
  ))
  .add("Review (accept)", () => (
    <Router
      initialRoute="/orders/123/review/accept"
      order={{
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
        stateExpiresAt: moment()
          .add(1, "day")
          .toISOString(),
        lastOffer: {
          ...OfferWithTotals,
          id: "last-offer",
          createdAt: moment()
            .subtract(1, "day")
            .toISOString(),
        },
        awaitingResponseFrom: "BUYER",
        offers: { edges: Offers },
        buyer: Buyer,
      }}
    />
  ))
  .add("Review (reject)", () => (
    // Steve was going to look into sharing these stubbed data sets, check with him before merging.
    <Router
      initialRoute="/orders/123/review/decline"
      order={{
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
        stateExpiresAt: moment()
          .add(1, "day")
          .toISOString(),
        lastOffer: {
          ...OfferWithTotals,
          id: "last-offer",
          createdAt: moment()
            .subtract(1, "day")
            .toISOString(),
        },
        awaitingResponseFrom: "BUYER",
        offers: { edges: Offers },
        buyer: Buyer,
      }}
    />
  ))

storiesOf("Apps/Order Page/Make Offer/Status", module)
  .add("submitted (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...OfferOrderWithShippingDetails,
        ...PaymentDetails,
        state: "SUBMITTED",
      }}
    />
  ))
  .add("submitted (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...OfferOrderPickup,
        ...PaymentDetails,
        state: "SUBMITTED",
      }}
    />
  ))
  .add("approved (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...OfferOrderWithShippingDetails,
        ...PaymentDetails,
        state: "APPROVED",
      }}
    />
  ))
  .add("approved (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...OfferOrderPickup,
        ...PaymentDetails,
        state: "APPROVED",
      }}
    />
  ))
  .add("fulfilled (ship)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...OfferOrderWithShippingDetails,
        ...PaymentDetails,
        state: "FULFILLED",
      }}
    />
  ))
  .add("fulfilled (pickup)", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...OfferOrderPickup,
        ...PaymentDetails,
        state: "FULFILLED",
      }}
    />
  ))
  .add("buyer rejected", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...OfferOrderWithShippingDetails,
        stateReason: "buyer_rejected",
        state: "CANCELED",
      }}
    />
  ))
  .add("seller rejected", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...OfferOrderWithShippingDetails,
        stateReason: "seller_rejected",
        state: "CANCELED",
      }}
    />
  ))
  .add("buyer lapsed", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...OfferOrderWithShippingDetails,
        stateReason: "buyer_lapsed",
        state: "CANCELED",
      }}
    />
  ))
  .add("seller lapsed", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...OfferOrderWithShippingDetails,
        stateReason: "seller_lapsed",
        state: "CANCELED",
      }}
    />
  ))
  .add("refunded", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...OfferOrderWithShippingDetails,
        state: "REFUNDED",
      }}
    />
  ))
  .add("cancelled after accept", () => (
    <Router
      initialRoute="/orders/123/status"
      order={{
        ...OfferOrderWithShippingDetails,
        state: "CANCELED",
        stateReason: null,
      }}
    />
  ))
