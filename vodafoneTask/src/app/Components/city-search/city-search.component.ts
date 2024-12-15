import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs'; // quick note : used to handle user input in a reactive and efficient manner

@Component({
    selector: 'app-city-search',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './city-search.component.html',
    styleUrl: './city-search.component.css',
})
export class CitySearchComponent implements OnInit, OnDestroy {
    searchCity: string = '';
    @Output() search = new EventEmitter<string>();
    private destroy$ = new Subject<void>();
    private searchChange$ = new Subject<string>();

    ngOnInit(): void {
        this.searchChange$
            .pipe(
                debounceTime(300),
                takeUntil(this.destroy$)
            )
            .subscribe((value) => {
                this.search.emit(value);
            });
    }
    onSearchChange() {
        this.searchChange$.next(this.searchCity);
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}