/* Prevent two workspaces from depending on conflicting versions of a same dependency */
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, OtherDependencyRange, DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  workspace_has_dependency(_, DependencyIdent, OtherDependencyRange, _),
  DependencyRange \= OtherDependencyRange,
  DependencyRange \= '*',
  OtherDependencyRange \= '*'.

/* Force all workspace dependencies to be made explicit */
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, 'workspace:*', DependencyType) :-
  workspace_ident(_, DependencyIdent),
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, DependencyType).
