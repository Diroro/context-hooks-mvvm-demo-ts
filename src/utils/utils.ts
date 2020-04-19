import { Observable } from "rxjs";
import { useState, useMemo, useEffect, createElement } from "react";
import { Sink } from "@devexperts/rx-utils/dist/sink2.utils";
import { fold } from "@devexperts/remote-data-ts";
import { constNull } from "fp-ts/lib/function";

export const useObservable = <A>(fa: Observable<A>, initial: A): A => {
  const [a, setA] = useState(initial);
  const subscription = useMemo(() => fa.subscribe(setA), [fa]);
  useEffect(() => () => subscription.unsubscribe(), [subscription]);
  return a;
};

export const useSink = <A>(
  factory: () => Sink<A>,
  dependencies: unknown[]
): A => {
  const sa = useMemo(factory, dependencies);
  const subscription = useMemo(() => sa.effects.subscribe(), [sa]);
  useEffect(() => () => subscription.unsubscribe(), [subscription]);
  return sa.value;
};

export const renderRemoteData = <A>(onSuccess: (a: A) => JSX.Element | null) =>
  fold(
    constNull,
    () => createElement("div", null, "pending"),
    () => createElement("div", null, "failure"),
    onSuccess
  );
